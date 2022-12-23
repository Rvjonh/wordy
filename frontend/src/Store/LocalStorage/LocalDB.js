

class LocalDB{

    constructor(){
        this.nameDB = "Diccionarios";
        this.storeDiccionario = "Diccionario";
        this.verDB = 1;
        this.db = null;

        let request = indexedDB.open("Diccionarios", this.verDB);

        request.onerror = (e)=>{
            this.db = e.target.result;
        }
        
        request.onsuccess = (e)=>{
            this.db = e.target.result;

            if (!this.db.objectStoreNames.contains("Diccionario")) {
                this.db.createObjectStore("Diccionario", { keyPath: "id" });
            }

            if (!this.db.objectStoreNames.contains("Operations")) {
                this.db.createObjectStore("Operations", { keyPath: "id" });
            }

            this.db.onversionchange = () => this.db.close();
        }

        request.onupgradeneeded  = (event) => {
            this.db = event.target.result;
            
            if (this.db.objectStoreNames.contains("Diccionario")) {
                this.db.deleteObjectStore("Diccionario");
            }
            this.db.createObjectStore("Diccionario", { keyPath: "id" });

            if (this.db.objectStoreNames.contains("Operations")) {
                this.db.deleteObjectStore("Operations");
            }
            this.db.createObjectStore("Operations", { keyPath: "id" });
        };
    }

    addDiccionary(item){
        let transaction = this.db.transaction(this.storeDiccionario, "readwrite");
        let store = transaction.objectStore(this.storeDiccionario);
        return store.put(item);
    }

    getAllDiccionaries(){
        let transaction = this.db.transaction(this.storeDiccionario);
        let store = transaction.objectStore(this.storeDiccionario);
        return store.getAll();
    }

    getOperations(){
        let transaction = this.db.transaction("Operations");
        let store = transaction.objectStore("Operations");
        return store.getAll();
    }

    addOperations(item){
        let transaction = this.db.transaction("Operations", "readwrite");
        let store = transaction.objectStore("Operations");
        return store.put(item);
    }

    withDB(callback){
        let request = indexedDB.open("Diccionarios", this.verDB);

        request.onerror = (e)=>{
            console.log("Error al abrir el almacenamiento local (IndexedDB)")
        }
        
        request.onsuccess = (e)=>{
            let db = e.target.result;
            callback(db)
        }
    }

}

export default new LocalDB();