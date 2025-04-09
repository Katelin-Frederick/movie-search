export interface Genre {
  name: string
  id: number
}

export interface ProductionCompany {
  origin_country: string
  logo_path: string
  name: string
  id: number
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}