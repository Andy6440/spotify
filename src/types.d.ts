export type Weather = 'sunny'|'rainy'|'cloudy'|'windy'|'stormy'
export type Visibility = 'great'|'good'|'ok'|'poor'

export interface WeatherI{
    id: number,
    date:string,
    weather:Weather,
    visibility :Visibility,
    comment: string
}