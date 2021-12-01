// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A place to learn TypeScript in a place where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript



// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.

type PackratConnection = {
    status: number;
    detail?: string;
}

type BlobFile = {
    name: string;
    content: Blob;
}

type PackratListType = {
    status: number;
    detail?: string;
    list: string[]
}

type PackratBlobType = {
    status: number;
    detail?: string;
    list: BlobFile[]
}

type PackratFormDataType = {
    status: number;
    detail?: string;
    formdata: FormData
}

function GetList(packrat: number): PackratListType {
    console.log("packrat:", packrat);

    let list = [
        '111.img',
        '111.hex',
        '111.json'
    ]

    return {
        status: 0,
        list: list
    };
}

function DownloadBlob(packrat: number, files: string[]): PackratBlobType {
    console.log('DownloadBlob...');
    console.log(packrat);

    let list: BlobFile[] = [];
    let info = '';

    files.map(value => 
        {
            let found = true;
            let blob: Blob = new Blob(['unknown']);
            
            if (value == '111.img') {
               blob = new Blob(['content of 111.img']);
            }
            else if (value == '111.hex') {
                blob = new Blob(['content of 111.hex']);
            }
            else if (value == '222.img') {
                blob = new Blob(['content of 222.img']);
            }
            else if (value == '222.hex') {
                blob = new Blob(['content of 222.hex']);
            }
            else
            {
                found = false;
                //console.log(value, " not found");
                info += (value + " not found")
            }

            if (found)
            {
                let file: BlobFile = { name: value,  content: blob}
                list.push(file);
            }
        }
    )

    return {
        status: 0,
        list: list
    };
}


function DownloadFormData(packrat: number, files: string[]): PackratFormDataType {
    console.log('DownloadFormData...');
    console.log(packrat);

    let data = new FormData();
    let info = '';

    files.map(value => 
        {
            let found = true;
            let blob: Blob = new Blob(['unknown']);
            
            if (value == '111.img') {
               blob = new Blob(['content of 111.img']);
            }
            else if (value == '111.hex') {
                blob = new Blob(['content of 111.hex']);
            }
            else if (value == '222.img') {
                blob = new Blob(['content of 222.img']);
            }
            else if (value == '222.hex') {
                blob = new Blob(['content of 222.hex']);
            }
            else
            {
                found = false;
                //console.log(value, " not found");
                info += (value + " not found")
            }

            if (found)
            {
                data.append(value, blob)
            }
        }
    )

    return {
        status: 0,
        detail: info,
        formdata: data
    };
}


function Connect(): PackratConnection{
    
    console.log('Connect...');

    let info: PackratConnection = 
    {
        status: 0,
        detail:'url:xxxx'
    }

    return info;
}

function Disconnect(): void {
    console.log('Disconnect...');
}


let connect_status = Connect();
console.log(connect_status);

let packrat_number = 3080091;
const list_result = GetList(packrat_number);
console.log(list_result);


const blob_result = DownloadBlob(packrat_number, list_result.list);
console.log(blob_result.detail);
blob_result.list.map(value => {
    console.log(value.name);
    value.content.text().then(x => { 
        console.log(x)
    })
})


const formdata_result = DownloadFormData(packrat_number, list_result.list);
console.log(formdata_result.detail);
for (var pair of formdata_result.formdata.entries()) {
    // pair[0]: filename
    // pair[1]: blob
    let blob = pair[1] as Blob;
    console.log(pair[0]);
    blob.text().then(x => {
        console.log(x)
    })
}

// disconnect
Disconnect();
