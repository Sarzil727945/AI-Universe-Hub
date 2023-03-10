// url 1st json convert start
  const loadUser = async(dataLimit = true) =>{
     const url = `https://openapi.programming-hero.com/api/ai/tools`;
     const res = await fetch(url);
     const data = await res.json();
     display(data.data.tools, dataLimit);
  };
// url 1st json convert end

//main part start
   function display(dataArray, dataLimit){
    // spinner function call 
       toggleSpinner(true);

  // Sort By Date part start 
    document.getElementById('btn-search').addEventListener('click', function(){
      // customSort part start 
        customSort = (a, b) =>{
          const dataA = new Date(a.published_in);
          const dataB = new Date(b.published_in);
          if (dataA > dataB) {
            return 1;
          }
          else if (dataA < dataB) {
            return -1;
          }
          else{
            return 0;
          }
        }
        dataArray = (dataArray.sort(customSort));
      // customSort part end

        const parentDiv = document.getElementById('parent-div');
        parentDiv.innerHTML = '';
        dataArray.forEach(element =>{
        // new tag create 
          const childDiv = document.createElement('div');
        // new tag class create 
          childDiv.classList.add('col');
          childDiv.innerHTML=`
             <div class="card h-100">
                   <div class="m-3">
                       <img src="${element.image}" class="card-img-top" alt="...">
                   </div>
                   <div class="card-body">
                       <h5 class="card-title">Features</h5>
                       <ol>
                        <li>${element.features[0]}</li>
                        <li>${element.features[1]}</li>
                        <li>${element.features[2]}</li>
                       </ol>
                       <hr>
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                             <h5 class="card-title">${element.name}</h5>
                             <p class="mt-3"><span class="fs-5"><i class="fa-regular fa-calendar-minus"></i></span> ${element.published_in}</p>
                        </div>
                        <div>
                             <button onclick="modalJson('${element.id}')" type="button" class="btn btn-outline-danger rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                  <i class="fa-solid fa-arrow-right"></i>
                             </button>
                        </div>
                      </div>
                   </div>
              </div>
          `
          // parentTag append childTag 
          parentDiv.appendChild(childDiv);
      }); 
      // button show all part start
        document.getElementById('show-all').addEventListener('click', function(){
          loadUser(false);   
        })
      // button show all part end 
    });
    
  // Sort By Date part end
     const parentDiv = document.getElementById('parent-div');
     parentDiv.innerHTML = '';
    // show all button part start
    const showAll = document.getElementById('show-all');
       if(dataLimit === true && dataArray.length > 6){
        dataArray = dataArray.slice(0, 6);
        showAll.classList.remove('d-none');
      }
      else{
        showAll.classList.add('d-none');
      }
    // show all button part end
     dataArray.forEach(element =>{
           // new tag create 
           const childDiv = document.createElement('div');
           // new tag class create 
           childDiv.classList.add('col');
           childDiv.innerHTML=`
              <div class="card h-100">
                    <div class="m-3">
                        <img src="${element.image}" class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        <ol>
                         <li>${element.features[0]}</li>
                         <li>${element.features[1]}</li>
                         <li>${element.features[2]}</li>
                        </ol>
                        <hr>
                       <div class="d-flex justify-content-between align-items-center">
                         <div>
                              <h5 class="card-title">${element.name}</h5>
                              <p class="mt-3"><span class="fs-5"><i class="fa-regular fa-calendar-minus"></i></span> ${element.published_in}</p>
                         </div>
                         <div>
                              <button onclick="modalJson('${element.id}')" type="button" class="btn btn-outline-danger rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                   <i class="fa-solid fa-arrow-right"></i>
                              </button>
                         </div>
                       </div>
                    </div>
               </div>
           `
           // parentTag append childTag 
           parentDiv.appendChild(childDiv);
     });
    //  spinner function call 
     toggleSpinner(false);
 };
// main part ends

// modal part start 
  // modal button click id jason part start
  function modalJson(id){
     const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
     fetch(url)
     .then(res => res.json())
     .then(data => modal(data));
   };
  // modal button click id jason part ends

 //  modal button click id function start
 function modal(objectModal){
    // modal 1st card start 
     const modalParent1Div = document.getElementById('modal-div1');
     modalParent1Div.innerHTML = '';
       const modalChild1Div = document.createElement('div');
       modalChild1Div.innerHTML =`
       <h5 class="card-title">${objectModal.data.description}</h5>
     <div class="row container d-flex align-items-center mt-5">
          <div class="col-lg-3 text-center text-success fs-5">
          <div class="shadow-sm p-3 mb-5 bg-body rounded">${objectModal.data.pricing ? objectModal.data.pricing[0].price : 'Free of Cost/Basic'}</div>
          </div>
          <div class="col-lg-3 text-center text-warning">
          <div class="shadow-sm p-3 mb-5 bg-body rounded fs-5">${objectModal.data.pricing ? objectModal.data.pricing[1].price : 'Free Of Cost/Pro'}</div>
          </div>
          <div class="col-lg-6 text-center text-danger fs-4">
          <div class="shadow-sm p-3 mb-5 bg-body rounded">${objectModal.data.pricing ? objectModal.data.pricing[2].price : 'Free of Cost /Enterprise'}</div>
          </div>
     </div>
     <div class="row container d-flex align-items-center mt-5">
       <div class="col-lg-6">
          <h4 class="card-title">Features</h4>
          <ul>
            <li>${objectModal.data.features[1].feature_name}</li>
            <li>${objectModal.data.features[2].feature_name}</li>
            <li>${objectModal.data.features[3].feature_name}</li>
          </ul>
       </div>
          <div class="col-lg-6 ">
            <h4 class="card-title">Integrations</h4>
            <ul>  
               <li>${objectModal.data.integrations ? objectModal.data.integrations[0] : 'No data Found'}</li>
               <li>${objectModal.data.integrations ? objectModal.data.integrations[1] : 'No data Found'}</li>
               <li>${objectModal.data.integrations ? objectModal.data.integrations[2] : 'No data Found'}</li>
            </ul>
          </div>
     </div>
       `  
     modalParent1Div.appendChild(modalChild1Div);
    // modal 1st card end

    // modal 2st card start
     const modalParent2Div = document.getElementById('modal-div2');
     modalParent2Div.innerHTML = '';

      const modalChild2Div = document.createElement('div');
      modalChild2Div.innerHTML = `
      <div class="position-relative">
         <div id="accuracyNull" class="position-absolute top-0 end-0 p-2">
           <button  type="button" class="btn btn-danger">${ objectModal.data.accuracy.score*100}% accuracy</button>
         </div>
         <div>
           <img  src="${objectModal.data.image_link[0]}" class="img-fluid rounded" alt="..."></img>
         </div>
      </div>
      <h5 class="card-title text-center mt-4">${objectModal.data.input_output_examples ? objectModal.data.input_output_examples[0].input : 'Can you give any example?' }</h5>
      <p class="card-text text-center">${objectModal.data.input_output_examples ? objectModal.data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
      `
      modalParent2Div.appendChild(modalChild2Div);
    // modal 2st card end

    // accuracy button part start 
      const btnAccuracy = document.getElementById('accuracyNull');
      if (objectModal.data.accuracy.score === null) {
        btnAccuracy.classList.add('d-none');
      }
    // accuracy button part end
   };
   // modal button click id function end
// modal part end

// button show all part start
document.getElementById('show-all').addEventListener('click', function(){
  loadUser(false);   
})
// button show all part end

// spinner part start
  function toggleSpinner(isLoading) {
    const spinnerField = document.getElementById('spinner');
    if(isLoading){
      spinnerField.classList.remove('d-none');
    }
    else{
      spinnerField.classList.add('d-none');
    }
  };
// spinner part end

 loadUser();








