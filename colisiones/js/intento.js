
import * as THREE from './three.js-master/build/three.module.js'
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js'
//import * as CANNON from './cannon.js-master/build/cannon.js'

//<script src="cannon.js"></script>
class Main{
    constructor(){
        this.initAtributos()
        this.initMateriales()
        this.initFisica()
        this.initEscena()
        this.initCamara()
        this.initComponentes()
    }
    initAtributos(){
        this.escena=null
        this.camarap=null
        this.camarao=null
        this.rbtcntrls=null
        this.renderizador=null
        this.ayudasombra=null
        this.gmtrs={}
        this.mallas={}
        this.colores={}
        this.luces={}
        this.fongos={}
        this.fisicos=[]
        this.cuadros=[]
        this.terreno=new THREE.Group()        
    }
    initMateriales(){
        this.colores[0]=new THREE.MeshBasicMaterial({color:"white"})
        this.colores[1]=new THREE.MeshBasicMaterial({color:"black"})
        this.colores[2]=new THREE.MeshBasicMaterial({color:"green"})
        const textura0=new THREE.TextureLoader().load('texture/caja.gif')
        const textura1=new THREE.TextureLoader().load('texture/madera.jpg')
        const textura2=new THREE.TextureLoader().load('texture/suelo-natural.jpg')
        const textura3=new THREE.TextureLoader().load('texture/suelo-seco.jpg')
        const textura4=new THREE.TextureLoader().load('texture/cobel.png')
        const textura5=new THREE.TextureLoader().load('texture/endstone.png')
        this.fongos["caja"]=new THREE.MeshPhongMaterial({map:textura0})
        this.fongos["madera"]=new THREE.MeshPhongMaterial({map:textura1})
        this.fongos["tierra"]=new THREE.MeshPhongMaterial({map:textura2})
        this.fongos["arena"]=new THREE.MeshPhongMaterial({map:textura3})
        this.fongos["piedra"]=new THREE.MeshPhongMaterial({map:textura4})
        this.fongos["end"]=new THREE.MeshPhongMaterial({map:textura5})
        this.luces[0]=new THREE.PointLight(this.colores[0],1,100)
        this.luces[1]=new THREE.PointLight(this.colores[0],1,100)
        this.luces[2]=new THREE.AmbientLight(this.colores[0],0.4)
        this.ayudasombra=new THREE.CameraHelper(this.luces[0].shadow.camera)
        this.gmtrs[0]=new THREE.PlaneGeometry(2,2,1,1)
        this.gmtrs[1]=new THREE.BoxGeometry(4,4,4)
        this.gmtrs[2]=new THREE.SphereGeometry(8,32,32)
        this.mallas["pelota"]=new THREE.Mesh(this.gmtrs[2],this.fongos["arena"])
        this.mallas["cubo"]=new THREE.Mesh(this.gmtrs[1],this.fongos["piedra"])
    }
    initEscena(){
        this.escena=new THREE.Scene()
    }
    initCamara(){
        this.camarap=new THREE.PerspectiveCamera(
            100, window.innerWidth/window.innerHeight, 0.1, 1000
        );
        this.renderizador=new THREE.WebGLRenderer()
        this.renderizador.setSize(window.window.innerWidth, window.innerHeight)
        this.renderizador.shadowMap.enabled=true
        document.body.appendChild(this.renderizador.domElement)
        this.rbtcntrls=new OrbitControls(this.camarap, this.renderizador.domElement)
        this.rbtcntrls.enableDamping=true
        this.rbtcntrls.dampingFactor=0.05
        this.rbtcntrls.minDistance=10
        this.rbtcntrls.listenToKeyEvents( window )
    }
    initFisica(){
        this.mundo=new CANNON.World()
        this.mundo.gravity.set(0,-10,0)
        this.mundo.broadPhase= new CANNON.NaiveBroadphase()
        this.crpplano=new CANNON.Body({
            mass:0,
            position:new CANNON.Vec3(0,-5,0),
        });
        this.crpbola=new CANNON.Body({
            mass:400,
            position:new CANNON.Vec3(20,35,-30),
            shape:new CANNON.Sphere(8)
        });       
        //this.crpbox=new CANNON.Body({
        //    mass:1,
        //    position:new CANNON.Vec3(1,1,21),
        //    shape:new CANNON.Box(new CANNON.Vec3(5,5,5))
        //}); 
        this.crpplano.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),Math.PI*27/16)
        this.crpplano.addShape(new CANNON.Plane())
        this.mundo.addBody(this.crpplano)
        this.mundo.addBody(this.crpbola)
        //this.mundo.addBody(this.crpbox)
        //console.log(this.crpbola)
        //console.log(this.crpplano)
        //console.log(this.crpbox)  
    }
    initComponentes(){
        this.meterBloques() 
        this.crearTerreno(50,50)
        this.escena.add(this.luces[0])
        this.escena.add(this.luces[1])
        this.escena.add(this.luces[2])
        //this.escena.add(this.mallas["cubo"])
        this.escena.add(this.mallas["pelota"])
        //this.terreno.rotateX(Math.PI*3/2)
        //this.terreno.position.set(0,-50,0)
        this.luces[0].position.set(40,35,0)
        this.luces[1].position.set(-40,35,0)
        this.luces[0].castShadow=true
        this.luces[1].castShadow=true
        //this.mallas["cubo"].castShadow=true
        this.mallas["pelota"].castShadow=true
        this.mallas["pelota"].receiveShadow=true
        this.camarap.position.set(-40,10,70)
    }
    meterBloques(){
        let forma=new CANNON.Box(new CANNON.Vec3(2,2,2))
        for(let i=0;i<90;i++){
            let equis=(Math.random()*60)-30;
            let seta=(Math.random()*60)-30;
            let ye=(Math.random()*20)+10;
            let m=new THREE.Mesh(this.gmtrs[1],this.fongos["piedra"])
            let crpbox=new CANNON.Body({
                mass:Math.random()*10,
            });
            crpbox.addShape(forma)
            m.castShadow=true
            m.receiveShadow=true
            crpbox.position.set(equis,ye,seta)
            m.position.set(equis,ye,seta)
            this.mundo.addBody(crpbox)
            this.escena.add(m)
            this.fisicos.push(crpbox)
            this.cuadros.push(m)            
        }        
    }
    crearTerreno(ancho, altura){
        this.escena.add(this.terreno)
        for(let i=0;i<ancho;i++){
            for(let j=0;j<altura;j++){
                let m=new THREE.Mesh(this.gmtrs[0],this.fongos["end"])
                m.receiveShadow=true
                this.terreno.add(m)
                let equis=(-ancho)+(i*2);
                let ye=(altura)-(j*2)
                m.position.set(equis,ye,0)
            }            
        }
        console.log(this.terreno)
    }
    animando(){
        requestAnimationFrame(()=>{this.animando()})
        this.mallas["pelota"].position.copy(this.crpbola.position)
        this.mallas["pelota"].quaternion.copy(this.crpbola.quaternion)
        this.terreno.position.copy(this.crpplano.position)        
        this.terreno.quaternion.copy(this.crpplano.quaternion)
        console.log("p "+this.crpplano.position)
        for(let c=0;c<this.fisicos.length;c++){
            this.cuadros[c].position.copy(this.fisicos[c].position)
            this.cuadros[c].quaternion.copy(this.fisicos[c].quaternion)
        }
        this.renderizador.render(this.escena,this.camarap)
        this.rbtcntrls.update()
        this.mundo.step(1.0/60.0)
        /*
        this.vez+=5
        if(this.ultimavez!==undefined){
            let dt=(this.vez-this.ultimavez)/1000
            this.mundo.step(dt,1/60,3);
        }
        this.ultimavez=this.vez*/
        //console.log("Sphere position: " + this.crpbola.position);
        //console.log("Plano position: " + this.crpplano.position);
        //console.log("Cubos position: " + this.crpbox.position);
    }
}

new Main().animando();
