import { BaseFields } from "../../types/Types";



export interface IRepository<T extends BaseFields> {
   
   getAll(): Promise<T[]> 

 

   getById( id: string): Promise<T>  

   create( data: T): Promise<T>  
 
   delete( id: string): Promise<void>  
   
   update(id: string, data: T): Promise<T>;
   
  }

export default IRepository;
