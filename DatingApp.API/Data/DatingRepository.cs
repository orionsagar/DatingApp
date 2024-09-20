using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using DatingApp.API.Helpers;
using System;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.users.Include(p => p.Photos).OrderByDescending(o => o.LastActive).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);

            users = users.Where(u => u.Gender == userParams.Gender);


            if (userParams.Likers)
            {
                var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
                if (userLikers != null)
                {
                    users = users.Where(u => userLikers.Any(liker => liker.LikerId == u.Id));
                }
            }

            if (userParams.Likees)
            {
                var userLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
                if (userLikees != null)
                {
                    users = users.Where(u => userLikees.Any(lke => lke.LikeeId == u.Id));
                }
            }

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                // users = users.Where(u => u.DateOfBirth.CalculateAge() >= userParams.MinAge
                //   && u.DateOfBirth.CalculateAge() <= userParams.MaxAge);

                var min = DateTime.Today.AddYears(-userParams.MinAge - 1);
                var max = DateTime.Today.AddYears(-userParams.MaxAge);

                users = users.Where(u => u.DateOfBirth >= min && u.DateOfBirth <= max);
            }

            if (string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }

            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        private async Task<IEnumerable<Like>> GetUserLikes(int id, bool likers)
        {
            var user = await _context.users
                .Include(x => x.Liker)
                .Include(x => x.Likee).AsQueryable()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user.Likee.Count > 0)
            {
                return user.Likee.Where(u => u.LikeeId == id).AsQueryable();
            }
            else
            {
                return user.Liker.Where(u => u.LikerId == id).AsQueryable();
            }
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Photo> GetPhotos(int id)
        {
            var photo = await _context.photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await _context.likes.FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == recipientId);
        }

        public async Task<Message> GetMessage(int Id)
        {
            return await _context.messages.FirstOrDefaultAsync(m => m.Id == Id);
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = _context.messages
                            .Include(u => u.Sender).ThenInclude(p => p.Photos)
                            .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                            .AsQueryable();

            switch (messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.RecipientDeleted == false);
                    break;
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParams.UserId && u.SenderDeleted == false);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.RecipientDeleted == false && u.IsRead == false);
                    break;
            }

            messages = messages.OrderByDescending(d => d.MessageSent);
            return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            var messages = await _context.messages
                            .Include(u => u.Sender).ThenInclude(p => p.Photos)
                            .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                            .Where(m => (m.RecipientId == userId && m.RecipientDeleted == false && m.SenderId == recipientId)
                            || (m.RecipientId == recipientId && m.SenderId == userId && m.SenderDeleted == false))
                            .OrderByDescending(d => d.MessageSent)
                            .ToListAsync();
            return messages;
        }
    }
}