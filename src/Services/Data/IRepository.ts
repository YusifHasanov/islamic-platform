

export interface IRepository<T> {
   
   getAll(): Promise<T[]> 

   getById( id: string): Promise<T>  

   create( data: T): Promise<T>  
 
   delete( id: string): Promise<T>  
   
   update(id: string, data: T): Promise<T>;
   
  }

export default IRepository;
