export interface ColumnType{
    name:string,
    key:string
}
export interface CardType{
    text:string,
    key:string
}
export interface Data{
    column: ColumnType; children: CardType[] 
}