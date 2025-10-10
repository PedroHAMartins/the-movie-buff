export class Get {
  private async getMovies() {
    const url = process.env['TMDB_URL'];
    const response = await fetch(url + '/movie/changes');

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
}
