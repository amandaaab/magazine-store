const helloComponent = {

    template: `
    <div class="home1">
    <h1>{{title}}</h1>
    <p>{{description}}</p>
    </div>
    `,

    data(){
        return{
            title: "Welcome to the magazine store!",
            description: "Alla tidningar från hela världen"
        }
    }
}