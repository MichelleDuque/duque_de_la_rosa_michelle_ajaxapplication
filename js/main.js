(() => {

    //variables
    const model = document.querySelector("#model");
    const hotspots = document.querySelectorAll(".Hotspot");
  
    const hotspotTemplate = document.querySelector("#hotspot-template");
  
    const materialTemplate = document.querySelector("#material-template");
    const materialList = document.querySelector("#material-list");
  
    //This information needs to be removed then pulled with an AJAX Call using the Fetch API
    //this is the api url https://swiftpixel.com/earbud/api/infoboxes"
  
  
      //This information needs to be removed then pulled with an AJAX Call using the Fetch API
      //this is the api url https://swiftpixel.com/earbud/api/materials"
  
      
  
    //functions
    function modelLoaded() {
      hotspots.forEach(hotspot => {
        hotspot.style.display = "block";
      });
    }
  
    function loadInfoBoxes() {
  
      fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then( infoBoxes => {
        console.log( infoBoxes);
  
      infoBoxes.forEach((infoBox, index) => {
  
        const clone = hotspotTemplate.content.cloneNode(true);
  
        let selected = document.querySelector(`#hotspot-${index+1}`);

        // Src is added but image is not working
        const imageElement= clone.querySelector(".image-hotspot");
        imageElement.src = infoBox.thumbnail;
  
        const titleElement= clone.querySelector(".title-hotspot");
        titleElement.textContent = infoBox.heading;
  
        const textElement = clone.querySelector(".p-hotspot");
        textElement.textContent = infoBox.description;
        
        selected.appendChild(imageElement);
        selected.appendChild(titleElement);
        selected.appendChild(textElement);
  
  
      }); 
  
    })
    .catch(error => console.error(error)); //catch and report any errors
  }
  
    loadInfoBoxes();
  
    function loadMaterialInfo() {
      fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(material_list => {
        // console.log(material_list);
  
        
        material_list.forEach(material => {
  
        //Make a copy of the template
        const clone = materialTemplate.content.cloneNode(true);
  
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;
  
          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;
  
  
          //append the populated templated to the ul
          materialList.appendChild(clone);
          console.log(clone);
      });
  
      material_list.innerHTML= "";   
  
      })
      .catch(error => console.error(error)); //catch and report any errors
    }
  
    loadMaterialInfo()
  
  
    function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
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
  