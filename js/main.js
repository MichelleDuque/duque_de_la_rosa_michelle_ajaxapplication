(() => {

    //variables
    const model = document.querySelector("#model");
    const hotspots = document.querySelectorAll(".Hotspot");
  
    const hotspotTemplate = document.querySelector("#hotspot-template");
    const boxModels = document.querySelector("#box-models");
  
    const materialBox = document.querySelector("#box-materials");   
    const materialTemplate = document.querySelector("#material-template");
    const materialList = document.querySelector("#material-list");
    const loadingbox = document.querySelector(".loading-box-1");
    const loadingbox2 = document.querySelector(".loading-box-2");


    const errorMessageBox = `<div class="error-box"><img src="images/error.png" class="error-image" alt="error photo"> <h2 class="title-error">Sorry, Page not found</h2></div>`

    let spinner =`<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
    <path fill="#333" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
    attributeName="transform"
    attributeType="XML"
    type="rotate"
    dur="1s"
    from="0 50 50"
    to="360 50 50"
    repeatCount="indefinite" />
    </path>
    </svg>`



      
    //functions
    function modelLoaded() {
      hotspots.forEach(hotspot => {
        hotspot.style.display = "block";
      });
    }

    function loadingSpinner(){
      loadingbox.innerHTML = spinner;
      loadingbox2.innerHTML = spinner;
    }

  
    function loadInfoBoxes() {
      loadingSpinner()
      fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then( infoBoxes => {

  
      infoBoxes.forEach((infoBox, index) => {
        
        loadingbox2.classList.add("hidden");

        const clone = hotspotTemplate.content.cloneNode(true);
  
        let selected = document.querySelector(`#hotspot-${index+1}`);

        const imageElement= clone.querySelector(".image-hotspot");
        imageElement.src = `images/${infoBox.thumbnail}`;
  
        const titleElement= clone.querySelector(".title-hotspot");
        titleElement.textContent = infoBox.heading;
  
        const textElement = clone.querySelector(".p-hotspot");
        textElement.textContent = infoBox.description;
        
        selected.appendChild(imageElement);
        selected.appendChild(titleElement);
        selected.appendChild(textElement);
  
  
      }); 
  
    })
    .catch(error => {
      boxModels.innerHTML = errorMessageBox;
      console.error('There was an error!', error);
  });

  }
  
    loadInfoBoxes();
  
    function loadMaterialInfo() {
      loadingSpinner()
      fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(material_list => {
  
        
        material_list.forEach(material => {

        loadingbox.classList.add("hidden");
          
        const clone = materialTemplate.content.cloneNode(true);
  
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;
  
          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;
  
          materialList.appendChild(clone);
      });
  
      material_list.innerHTML= "";   
  
      })
      .catch(error => {
        materialBox.innerHTML = errorMessageBox;
        console.error('There was an error!', error);
    });

    }
  
    loadMaterialInfo()
  
  
    function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });

      gsap.fromTo('.image-hotspot', {
        y: 30,
        opacity: 0,
      },
      {
      delay: 0.5, 
      duration: 1, 
      y: 0,
      opacity: 1,
      ease: 'power2.easeOut',
      stagger: {
        from: 'start', 
        amount: 0.5, 
      },
    })

    }
  
    function hideInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
  
    //Event listeners
    model.addEventListener("load", modelLoaded);
  
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
    });
  
  })();
  