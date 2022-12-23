import LocalDB from './LocalDB';

export default function keepIntoOperations({type="", data={}}){
    if(type===""){
        return false
    }

    const report = {
        id : "0",
        type : type,
        data : data,
    }

    LocalDB.withDB((db)=>{
        let transaction = db.transaction("Operations", "readwrite");
        let store = transaction.objectStore("Operations");
        let r = store.getAll();

        r.onsuccess = ()=>{
            let idDic = 0;
            try{
                idDic = parseInt(r.result[r.result.length-1].id)+1;
            }catch{
                idDic = 0;
            }
            report.id = `${idDic}`;
            return store.put(report);
        }

        r.onerror=()=>{
            console.error("No se ha podido guardar la operacion...")
        }
    })
} 