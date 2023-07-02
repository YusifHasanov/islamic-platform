import FetchAPI from "../components/globals/FetchAPI";
import Toast from "./Toast";

export default class CrudService {
    private fetchAPI = FetchAPI.getInstance();
    private toast = Toast.getInstance();
    private static readonly INSTANCE = new CrudService();
    
    private async handleResponse(callbck: () => void) {
        try {
            callbck();
            this.toast.success("Dəyişikliklər uğurla yadda saxlandı");
        } catch (error) {
            this.toast.error("Dəyişikliklər yadda saxlanılarkən xəta baş verdi");
        }
    }
    public async update(callbck: () => void) {
        if (window.confirm("Dəyişiklikləri yadda saxlamaq istədiyinizə əminsiniz?")) {
            this.handleResponse(callbck);
            return;
        }
        this.toast.info("Dəyişikliklər yadda saxlanılmadı");
    }
    public async delete(callbck: () => void) {
        if (window.confirm("Silmək istədiyinizə əminsiniz?")) {
            this.handleResponse(callbck);
            return;
        }
        this.toast.info("Silinmədi");

    }

    public async add(callbck: () => void) {
        if (window.confirm("Əlavə etmək istədiyinizə əminsiniz?")) {
            this.handleResponse(callbck);
            return;
        }
        this.toast.info("Əlavə edilmədi");
    }


    public async get(path: string) {
        return await this.fetchAPI.get(path)
    }

    public static getInstance(): CrudService {
        return this.INSTANCE;
    }
}