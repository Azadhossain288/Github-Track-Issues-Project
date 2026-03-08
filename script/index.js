console.log("Hello github issues");


const loadLessons=()=>{

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((json)=>displayLesson(json.data));

}


// "data": {
//     "id": 33,
//     "title": "Add bulk operations support",
//     "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
//     "status": "open",
//     "labels": [
//       "enhancement"
//     ],
//     "priority": "low",
//     "author": "bulk_barry",
//     "assignee": "",
//     "createdAt": "2024-02-02T10:00:00Z",
//     "updatedAt": "2024-02-02T10:00:00Z"
//   }


const loadLevelWord=(id)=>{

       const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
       console.log(url);

       fetch(url)
       .then((res)=>res.json())
       .then((data)=>displayLevelWord(data.data));


   }


   const displayLevelWord=(words)=>{

        console.log(words);

        // get id

        const wordContainer=document.getElementById("word-container");

        //empty

        wordContainer.innerHTML="";

        // Using for each loop and showing word

     const wordsArray = Array.isArray(words) ? words : [words];
        
      wordsArray.forEach((word) => {
          
                console.log(word);

             // create element

             const card=document.createElement("div");

             card.innerHTML=`
             
                <div class="bg-white rounded-xl shadow-lg p-6 space-y-4 border border-gray-100 text-left">
                <div class="flex justify-between items-center">
                    <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <i class="fa-solid fa-circle-dot text-green-500"></i>
                    </div>
                    <span class="badge badge-error badge-outline font-bold text-xs">${word.priority.toUpperCase()}</span>
                </div>

                <div>
                    <h2 class="font-bold text-xl text-gray-800 leading-tight">${word.title}</h2>
                    <p class="text-gray-500 text-sm mt-2 line-clamp-2">${word.description}</p>
                </div>

                <div class="flex gap-2 flex-wrap">
                    ${word.labels.map(label => `<span class="badge badge-sm bg-red-50 text-red-500 border-red-200"># ${label}</span>`).join('')}
                    <span class="badge badge-sm bg-orange-50 text-orange-500 border-orange-200">HELP WANTED</span>
                </div>

                <hr class="border-gray-100">

                <div class="text-gray-400 text-xs font-medium">
                    <p>#${word.id} by ${word.author}</p>
                    <p>${new Date(word.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
         
             
             
             `



             //append

             wordContainer.append(card);





         });


        



   }


const displayLesson=(lessons)=>{

   console.log(lessons);

   // 1.Get the container & empty

   const levelContainer=document.getElementById("level-container");
   levelContainer.innerHTML= "";


   

   // 2.Get into every lessons

   for(const lesson of lessons){

    //  create element

     console.log(lesson);

     const btnDiv=document.createElement("div");
     btnDiv.innerHTML=`
     
         <button onclick="loadLevelWord(${lesson.id})"class="btn btn-outline btn-primary">All-${lesson.id}</button>
     
     
     
     `






    //  append element


    levelContainer.append(btnDiv);



   }




   





}

loadLessons();