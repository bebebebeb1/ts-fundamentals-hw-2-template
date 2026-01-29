const PER_PAGE = 40;

export default class Pagination {
  private readonly perPage: number;
  private page: number;

  constructor(perPage: number = PER_PAGE) {
    this.perPage = perPage;
    this.page = 1;
  }

  reset(): void {
    this.page = 1;
  }

  nextPage(): number {
    this.page += 1;
    return this.page;
  }

  getPage(): number {
    return this.page;
  }

  getPerPage(): number {
    return this.perPage;
  }
}
