const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

//Gracias
const flowGracias = addKeyword(['gracias']).addAnswer(
    [
        ' Gracias a ti, espero disfrutes del tour 🏔',
        'Si deseas consultas nuestras actividades y ver un dia en matacanes, tenemos videos para ti.',
        '[*Tiktok*] https://www.tiktok.com/@alpekadventures',
        '[*Instagram*] https://www.instagram.com/alpekadventures/?hl=es',
        '\nQue tengas buen día. 😊',
    ]
)

//Redes -Secundario
const flowSecundarioRedes = addKeyword(['redes', 'tiktok', 'instagram']).addAnswer(
    [

        '[*Tiktok*] https://www.tiktok.com/@alpekadventures',
        '[*Instagram*] https://www.instagram.com/alpekadventures/?hl=es'
    ],
    null,
    null,
    [flowGracias]
)


    //Información 
    const flowInfo = addKeyword(['informacion', 'info']).addAnswer(
        [
            '📑 Toda la información esta en nuestra pagina web.',
            'https://www.alpekadventures.mx/',
            '\nEscribe *redes* para ver las actividades y nuestro tour en matacanes. ',
        ],
        null,
        null,
        [flowSecundarioRedes]
    )
    //Tours
    const flowTour = addKeyword(['tour', 'ruta', 'recorrido']).addAnswer(
        [
            '🙌 Observa los diferentes tours que tenemos para ti',
            'http://www.alpekadventures.mx/tours/matacanes',
            '\nEscribe *redes* para ver las actividades y nuestro tour en matacanes. ',
        ],
        null,
        null,
        [flowSecundarioRedes]
    )

    //Imagen
    const flowImagen = addKeyword(['imagen']).addAnswer({media:'https://i.imgur.com/YFJfL7z.jpeg'}
    )



//Inicial.
const flowPrincipal = addKeyword(['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'holaa', 'holaaa']).addAnswer(
    [
        'Hola bienvenido a Alpek 🏕🚙'
    ]
).addAnswer(
    [
        'Disfruta de los mejores tours en Matacanes',
        'Consulta nuestras actividades *info*',
        'Para saber mas sobre los tour *tour*',
    ],
    null,
    null,
    [flowInfo, flowTour, flowImagen]
)


//Botones
const flowBotones = addKeyword('botones').addAnswer(
    'Estos son los botones:', {
        buttons:[
            {
                body:'boton1'
            },
            {
                body:'boton2'
            },
            {
                body:'boton3'
            }
        ]
    }
)




// Funcion Main para indicar el tipo de DB, indicar el flow principal, y el proveedor.
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowGracias, flowBotones])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,          //Referencia al flowPrincipal.
        provider: adapterProvider,  //Proveedor Baileys
        database: adapterDB,        //Referencia a la base de datos, en este caso es memory (mock)
    })

    QRPortalWeb()
}

main()




