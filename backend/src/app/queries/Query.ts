export default interface Query<T> {
    execute(): Promise<T>;    
}