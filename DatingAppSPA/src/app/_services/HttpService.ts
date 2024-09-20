class HttpService {
  get<TData, TResult>(url: string, data?: TData): Promise<TResult> {
    return fetch(url, data)
      .then((x) => x.json())
      .catch((err) => console.log(err));
  }
}
