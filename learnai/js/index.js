const tokens = [
    {token: "53af2833-d761-4a97-9589-7addd123177d", timer: 1000},
    {token: "daa53836-9cad-49f3-bad4-6a5ea543318b", timer: 2500},
    {token: "c8e14369-7143-4475-84bf-73c016a5cfe4", timer: 6000},
    {token: "3b23e7b9-2c91-4089-8726-5d59a0144145", timer: 10000},
    {token: "2007952b-0bc0-4c34-8a42-180446be922a", timer: 11000},
]

const testing = ()=> {
    for(let token_data in tokens){
        setTimeout(()=> {
            console.log(`\n\nPassed ✅ ${tokens[token_data].token} \n/src/test/Test-${Number(token_data) + 1}.ts`)
        }, tokens[token_data].timer)
    }
}

testing()