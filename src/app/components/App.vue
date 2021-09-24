<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">Cercador de Padró</a>
        </nav>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="searchPadro">
                                <div class="form-group">
                                    <input id="dni" v-model="padro.dni" role="alert" type="text" placeholder="Inserta el DNI/NIE" class="form-con">
                                    <button class="btn btn-primary btn-block">Consultar</button>
                                    <div class="icon">
                                        <i class="bi-file-pdf"></i>
                                    </div>
                                    <div class="pl-3 data">
                                        <p class="m-0"><a :href="'./docs/SVC_2021_Val_Dinar_Gent_Gran.pdf'">Descarregar Formulari</a></p>
                                    </div>                                        
                                </div>                                
                            </form>
                        </div>
                    </div>
                </div>                
                <div class="col-md5">
                    <div class="card">
                        <div class="card-body">    
                            <div :class="alert_class" :hidden=alertShow>{{status}}</div>
                        </div>
                        <div class="card-body" v-if="padroResult.dni">
                            <p> DNI: {{padroResult.dni}}</p>
                            <p> EDAT: {{padroResult.edat}}</p>
                            <p v-if="padroResult.entregat">ENTREGAT : Si, <b>no es pot tornar a donar.</b></p>
                            <div v-else><p>ENTREGAT : Encara no... podeu fer el tiquet.</p>
                                <button class="btn btn-primary btn-block" v-on:click="marcar(padroResult._id)">Marcar</button>                                
                            </div>
                            
                        </div>                            
                    </div>
                </div>
            </div>                
        </div>
    </div>    
</template>
<script>
    
    export default{
        
        data(){
            return{
                padro:{
                    dni:null,
                    edat:null,
                    entregat:false,
                },
                padroResult:{
                    dni:null,
                    edat:null,
                    entregat:false,
                },
                status:"",
                alertShow:true,                
                alert_class_types:['alert alert-danger','alert alert-success','alert alert-primary'],
                alert_class:"alert alert-danger"

            }
        },
        methods:{
            searchPadro(){
                fetch('/api/padro/find', {
                    method: 'POST',
                    body: JSON.stringify(this.padro),
                    headers:{
                        'Accept':'applications/json',
                        'Content-type':'application/json'
                    }
                })                                                        
                .then(res => res.json())
                .then(data =>{
                    if(data.status){
                        alert(data.status);
                    }else{
                        this.alert_class = this.alert_class_types[2];
                        this.alertShow=false;                    
                        this.status = "S'han torbat padrons amb aquest DNI/NIE";                                                         
                        this.padroResult = data;                    
                    }
                })                                                   
                .catch(err => {
                    this.alert_class = this.alert_class_types[0];
                    this.alertShow=false;                    
                    this.status = "El dni/nie no estroba a la base de dades o es menor de 65 anys";

                })
            },
            marcar(id){
                
                fetch('/api/padro/update/'+id, {
                    method: 'PUT',
                    body: JSON.stringify(this.padroResult),                    
                    headers:{
                        'Accept':'applications/json',
                        'Content-type':'application/json'
                    }
                })
                .then(res => res.json())
                .then(data =>{                    
                    this.alert_class = this.alert_class_types[1];
                    this.alertShow=false;                    
                    this.status = "S'ha marcat com a Entregat correctament, dades desades.";                                                         
                    this.padroResult = data; 
                })
            }
        }
    }
</script>
