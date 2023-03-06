class Main{    
    constructor(){
	 	this.initVariables();
	 	this.initEscena();
	 	this.initCamara();
	 	this.initColores();
        this.cubitos();
        this.cuadro() 	 	
	}
    initVariables(){
        this.escena = null
        this.camara = null
        this.renderizador = null
        this.grupitos={}
        this.mallas={}
        this.colores={}
        this.rlcnspct = window.innerWidth/window.innerHeight
        this.frstmsz = 10
        this.pixelart=[
            [0,0,8,0,0,7,2,2,2,2,0,0,0,0,8,0],
            [8,0,8,0,0,2,2,2,2,2,2,0,7,0,0,0],
            [0,0,0,7,2,2,2,2,2,2,2,2,0,0,0,8],
            [0,0,0,2,2,2,2,2,2,2,2,2,2,7,0,0],            
            [0,7,0,2,0,3,3,3,3,3,3,0,2,0,0,0],
            [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
            [4,0,0,3,3,3,3,3,3,3,0,3,3,0,0,4],
            [4,4,0,0,3,3,3,3,3,0,4,0,3,0,4,4],
            [0,4,3,0,3,3,3,3,0,4,4,0,3,3,4,0],
            [0,0,3,3,0,3,0,0,4,4,4,4,0,3,0,8],
            [8,0,3,3,0,0,0,4,4,4,0,0,0,3,0,0],            
            [0,0,3,0,1,6,0,4,4,0,6,1,0,0,7,0],
            [8,0,0,0,4,6,1,4,4,1,6,4,0,7,0,0],
            [0,0,7,0,0,4,4,4,4,4,4,0,0,0,7,8],
            [0,7,0,2,2,0,4,4,4,4,0,2,2,0,7,0],
            [0,0,7,2,2,2,2,2,2,2,2,2,2,0,0,0],
            [0,4,4,5,5,2,2,2,2,2,2,5,5,4,4,0],
            [0,4,4,2,2,5,5,3,3,5,5,2,2,4,4,0],            
            [0,0,0,2,2,2,2,3,3,2,2,2,2,0,0,0],
            [0,7,0,0,0,2,2,2,2,2,2,0,0,7,0,0],
            [8,0,0,5,5,5,0,0,0,0,5,5,5,0,0,0],
            [8,0,0,5,5,5,0,7,7,0,5,5,5,0,8,8]            
        ]
    }
    initEscena(){
        this.escena=new THREE.Scene()        
    }
    initCamara(){        
        //ortogonal
        //izquierda derecha cima fondo cerca lejos
         let frstmsz=10
         this.camara=new THREE.OrthographicCamera(
             -(frstmsz/2)*this.rlcnspct,
             (frstmsz/2)*this.rlcnspct,
             frstmsz/2,
             -frstmsz/2,
             0.1,
             100
         )
        //perspectiva o normal
        //  fov proporcion inicio final
        //  this.camara=new THREE.PerspectiveCamera(
        //      75,this.rlcnspct,0.1,1000
        //  )             
        this.renderizador=new THREE.WebGLRenderer();
        this.renderizador.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderizador.domElement)
		this.camara.position.z = 10                
    }
    initColores(){
        this.colores[0]=new THREE.MeshBasicMaterial({color: "black"})
        this.colores[1]=new THREE.MeshBasicMaterial({color: "white"})
        this.colores[2]=new THREE.MeshBasicMaterial({color: "green"})
        this.colores[3]=new THREE.MeshBasicMaterial({color: "yellow"})
        this.colores[4]=new THREE.MeshBasicMaterial({color: "#f0cb7d"})
        this.colores[5]=new THREE.MeshBasicMaterial({color: "#4f3706"})
        this.colores[6]=new THREE.MeshBasicMaterial({color: "cyan"})
        this.colores[7]=new THREE.MeshBasicMaterial({color: "#1f1f1f"})
        this.colores[8]=new THREE.MeshBasicMaterial({color: "#333333"})
    }
    cuadro(){
        this.grupitos.pixelart=new THREE.Group()
        this.escena.add(this.grupitos.pixelart)
        let ld=0.3        
        let dimensiones={
            ancho: this.pixelart[0].length,
            altura: this.pixelart.length
        }
        for(let i=0;i<this.pixelart.length;i++){
            for(let j=0;j<this.pixelart[i].length;j++){
                let g=new THREE.BoxGeometry(ld,ld,ld)
                let pixel=new THREE.Mesh(g,this.colores[this.pixelart[i][j]])
                this.grupitos.pixelart.add(pixel)                
                pixel.position.x = -(dimensiones.ancho/2)*ld 
				pixel.position.y = (dimensiones.altura/2)*ld 
				pixel.position.x += j * ld
				pixel.position.y -= i * ld                                                         
            }
        }                
        this.grupitos.pixelart.scale.x=2
    }
    cubitos(){
        let gmtr=new THREE.BoxGeometry(2,2,2)
        this.mallas.cubuno=new THREE.Mesh(gmtr, this.colores[2])
        this.mallas.cubdos=new THREE.Mesh(gmtr, this.colores[3])
        this.mallas.cubres=new THREE.Mesh(gmtr, this.colores[4])
        this.mallas.cubtro=new THREE.Mesh(gmtr, this.colores[1])
        //this.escena.add(this.mallas.cubuno)
        //this.escena.add(this.mallas.cubdos)
        //this.escena.add(this.mallas.cubres)
        //this.escena.add(this.mallas.cubtro)
        this.mallas.cubuno.position.x=-2
        this.mallas.cubuno.position.y=-2
        this.mallas.cubdos.position.x=2
        this.mallas.cubdos.position.y=-2
        this.mallas.cubres.position.x=-2
        this.mallas.cubres.position.y=2
        this.mallas.cubtro.position.x=2
        this.mallas.cubtro.position.y=2
    }
    animacion(){ 
        this.grupitos.pixelart.scale.x=1  
        this.grupitos.pixelart.scale.y=1  
        this.grupitos.pixelart.scale.z=1  
        this.mallas.cubuno.rotateX(0.005)
        this.mallas.cubuno.rotateY(0.005)
        this.mallas.cubtro.rotateZ(0.01)
        this.grupitos.pixelart.rotateZ(0.01)
        this.grupitos.pixelart.rotateY(0.005)
        this.grupitos.pixelart.rotateX(0.005)
        this.grupitos.pixelart.translateX(0)
        requestAnimationFrame(()=>{this.animacion()})
        this.renderizador.render(this.escena, this.camara)
    }
    
}

new Main().animacion()
