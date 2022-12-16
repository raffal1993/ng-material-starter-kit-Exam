export interface ProductsModel {
  readonly id: number
  readonly title: string,
  readonly price: number
  readonly description: string,
  readonly category: string
  readonly image: string
  readonly rating: {
    readonly  rate: number
    readonly  count: number
  }
}
