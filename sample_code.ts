// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A place to learn TypeScript in a place where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript


let img_1 = ['i','m','g','1'];

let hex_1 = ['h','e','x','1'];

let img_2 = ['i','m','g','2'];

let hex_2 = ['h','e','x','2'];

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.

type PackratConnectionStatus = {
    status: 'success' | 'server not found'| 'connect failed';
    info: string;
}

type BlobFile = {
    name: string;
    content: Blob;
}

function GetList(packrat: number): string[] {
    console.log("packrat:", packrat);

    let list = [
        '111.img',
        '111.hex',
        '111.json'
    ]

    return list;
}

function DownloadBlob(packrat: number, files: string[]): BlobFile[] {
    console.log('DownloadBlob...');
    console.log(packrat);

    let list: BlobFile[] = [];


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
                console.log(value, " not found");
            }

            if (found)
            {
                let file: BlobFile = { name: value,  content: blob}
                list.push(file);
            }
        }
    )

    return list;
}


function DownloadFormData(packrat: number, files: string[]): FormData {
    console.log('DownloadFormData...');
    console.log(packrat);

    let data = new FormData();

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
                console.log(value, " not found");
            }

            if (found)
            {
                data.append(value, blob)
            }
        }
    )

    return data;
}


function Connect(): PackratConnectionStatus{
    
    console.log('Connect...');

    let info: PackratConnectionStatus = 
    {
        status:'success',
        info:'url:xxxx'
    }

    return info;
}

function Disconnect(): void {
    console.log('Disconnect...');
}



let packrat_number = 3080091;
let connect_status = Connect();
let list = GetList(packrat_number);
console.log(list);


let files = DownloadBlob(packrat_number, list);
files.map(value => {
    console.log(value.name);
    value.content.text().then(x => { 
        console.log(x)
    })
})


let data = DownloadFormData(packrat_number, list);
for (var pair of data.entries()) {
    let blob = pair[1] as Blob;
    console.log(pair[0]);
    blob.text().then(x => {
        console.log(x)
    })
}

Disconnect();
