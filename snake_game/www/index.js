async function init() {

    const memory = new WebAssembly.Memory({initial: 1});

    const importObject = {
        js: {
          mem: memory
        },
        console: {
            log: () => {
                console.log("Logging something!!!!");
            }
        }
    }

    const response = await fetch("sum.wasm");
    const buffer = await response.arrayBuffer();
    const wasm = await WebAssembly.instantiate(buffer, importObject);

    const sumFunction = wasm.instance.exports.sum;
    const result = sumFunction(100, 80);
    console.log(result);
}

init();