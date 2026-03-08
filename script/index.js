console.log("Hello github issues");


const loadLessons=()=>{

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((json)=>displayLesson(json.data));

}


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

        const wordContainer=document.getElementById



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