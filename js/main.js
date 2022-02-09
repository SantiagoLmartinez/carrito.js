// carrito
let carrito = {}
// FOR IN PARA RECORRER OBJETOS
// FOR EACH PARA RECORRER ARRAY

// const
const _itemsCarrito = document.getElementById('itemsCarrito')
const _footerCarrito = document.getElementById('footerCarrito')


// Para asegurarnos que se cargo el HTML X2
document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        pintarProductos(data)
        detectarButton(data)
        // console.log(data);
    } catch (error) {
        console.log(error)
    }

}

const pintarProductos = (data) => {
    const _productosContainer = document.getElementById('productosContainer')
    const _template = document.getElementById('template').content
    const fragment = document.createDocumentFragment()
    // console.log(_template)

    data.forEach(producto => {
        // console.log('forEach =',producto)
        _template.querySelector('img').setAttribute('src', producto.img)
        _template.querySelector('h5').textContent = producto.title
        _template.querySelector('span').textContent = producto.precio
        _template.querySelector('button').dataset.id = producto.id

        const _clone = _template.cloneNode(true)
        fragment.appendChild(_clone)
    });
    _productosContainer.appendChild(fragment)
}

const detectarButton = (data) => {
    const btn = document.querySelectorAll('.card  button')
    btn.forEach(button => {
        button.addEventListener('click', () => {
            // console.log( button.dataset.id )
            const producto = data.find(item => item.id === parseInt(button.dataset.id))
            producto.cantidad = 1

            if (carrito.hasOwnProperty(producto.id)) {
                // en caso de que el producto exista sumar 1 al carrito
                producto.cantidad = carrito[producto.id].cantidad + 1
                // producto.cantidad++

                // console.log('Producto agregado +1', producto)

            }
            // {...} copia el objeto/producto al carrito //Spread operator
            carrito[producto.id] = { ...producto }
            // console.log(carrito)

            pintarCarrito()

        })

    })
}
const pintarCarrito = () => {
    const _template = document.getElementById('templateCarrito').content
    const _fragment = document.createDocumentFragment()

    // Limpiamos el container del carrito
    _itemsCarrito.innerHTML = ''

    // Tranformamos carrito a array = Object.values(carrito)
    Object.values(carrito).forEach(producto => {
        // console.log('el producto', producto)
        _template.querySelector('th').textContent = producto.id
        _template.querySelectorAll('td')[0].textContent = producto.title
        _template.querySelectorAll('td')[1].textContent = producto.cantidad
        let total = producto.precio * producto.cantidad
        _template.querySelector('span').textContent = total
        // btn
        _template.querySelector('#btnAdd').dataset.id = producto.id
        _template.querySelector('#btnRemove').dataset.id = producto.id


        const _clone = _template.cloneNode(true)
        _fragment.appendChild(_clone)
    })
    _itemsCarrito.appendChild(_fragment)
    pintarFooterCarrito()
    accionBtnCarrito()
}

const pintarFooterCarrito = () => {
    _footerCarrito.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        _footerCarrito.innerHTML =
            `<tr scope="row" colspan="5" id="footerCarrito"><th>Carrito vacio agregar productos para comprar</th></tr>`
            return
    }
    const _template = document.getElementById('templateFooterCarrito').content
    const _fragment = document.createDocumentFragment()

    //reduce 1-acumulador, 2-propiedad a iterar, 3- operacion a realizar, 4- tipo de dato que devuelve
    const nCantidad = Object.values(carrito).reduce((acumulador, { cantidad }) => acumulador + cantidad, 0)
    // console.log('Total: ', nCantidad)

    const nTotal = Object.values(carrito).reduce((acumulador, { cantidad, precio }) => acumulador + (cantidad * precio), 0)
    // console.log('Total: ', nTotal)


    _template.querySelector('td').textContent = nCantidad
    _template.querySelector('span').textContent = nTotal

    const _clone = _template.cloneNode(true)
    _fragment.appendChild(_clone)
    _footerCarrito.appendChild(_fragment)

    const _btnVaciarCarrito = document.getElementById('vaciarCarrito')
    _btnVaciarCarrito.addEventListener('click', () => {
        // console.log('diste click para vaciar carrito')
        carrito = {}
        pintarCarrito()
    })

}
const accionBtnCarrito = () =>{
    const _btnAdd = document.querySelectorAll('#itemsCarrito .btn-info')
    const _btnRemove = document.querySelectorAll('#itemsCarrito .btn-danger')

    _btnAdd.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            // console.log('diste click en +')
            const producto = carrito[btn.dataset.id]
            producto.cantidad ++
            carrito[btn.dataset.id] = {... producto}
            pintarCarrito()
        })
    })

    _btnRemove.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            // console.log('diste click en -')
            const producto = carrito[btn.dataset.id]
            producto.cantidad --
            if(producto.cantidad === 0){
                // delete se usa para borrar solo en objetos
                delete carrito[btn.dataset.id]
            }else{
                carrito[btn.dataset.id] = {... producto}
            }
            pintarCarrito()
            
        })
    })
}

