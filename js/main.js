
//  DocumentFragment('template')

// Para asegurarnos que se cargo el HTML X2
document.addEventListener('DOMContentLoaded', ()=>{
    fetchData()
})

const fetchData = async () =>{
    try {   
        const res = await fetch('api.json')
        const data = await res.json()
        pintarProductos(data)
        // console.log(data);
    } catch (error) {
        console.log(error)
    }
    
}

const pintarProductos = (data) =>{
    // const
const _productosContainer = document.getElementById('productosContainer')
const _template =  document.getElementById('template').content
const fragment = document.createDocumentFragment()
console.log(_template)

data.forEach(producto =>  {
    // console.log('forEach =',producto)
     _template.querySelector('img').setAttribute('src', producto.img)
     _template.querySelector('h5').textContent = producto.title
     _template.querySelector('span').textContent = producto.precio

    
     const clone = _template.cloneNode(true)
     fragment.appendChild(clone)
});
_productosContainer.appendChild(fragment)
}
// fetchData()

