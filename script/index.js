console.log("Hello github issues");


let currentStatus='all';


const loadLessons = () => {
    const loader = document.getElementById("filter-loader");
    const wordContainer = document.getElementById("word-container");

    
    if(loader) loader.classList.remove("hidden"); // Initialy see loader
    const cards = wordContainer.querySelectorAll('div:not(#filter-loader)');
    cards.forEach(card => card.remove());

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {
            const allData = json.data;
            if(loader) loader.classList.add("hidden"); 
            displayFilterButtons(allData);
            displayLevelWord(allData);
        });
}

const loadWordByIdForModal = (id) => {
    const detailsBox = document.getElementById("details-container");
    const modal = document.getElementById("my_modal_5");

   
    detailsBox.innerHTML = `
        <div class="flex flex-col items-center justify-center py-10">
            <span class="loading loading-spinner loading-lg text-primary"></span>
            <p class="mt-4 text-slate-500">Fetching issue details...</p>
        </div>
    `;
    
    
    modal.showModal();

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            
            displayWordDetails(data.data);
        })
        .catch(err => {
            console.error("Error loading issue details:", err);
            detailsBox.innerHTML = `
                <div class="text-center py-10">
                    <p class="text-error font-bold">Failed to load data.</p>
                    <form method="dialog"><button class="btn btn-sm mt-4">Close</button></form>
                </div>`;
        });
}


// all remove active class
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => {
        btn.classList.remove("active");
        // back to color 
        btn.classList.add("bg-white", "text-gray-600");
    });
};








// 2.creating all,open,closed button

const displayFilterButtons = (issues) => {
    const levelContainer = document.getElementById("level-container");

    const totalCount = issues.length;
    const openCount = issues.filter(issue => issue.status === 'open').length;
    const closedCount = issues.filter(issue => issue.status === 'closed').length;


    // set id and class 


    levelContainer.innerHTML = `
        <div class="flex justify-start mb-6 ">
            <div class="join border border-gray-200 bg-white gap-4 rounded-xl">
                <button id="btn-all" onclick="filterIssues('all')" 
                    class="btn join-item lesson-btn rounded-2xl ${currentStatus === 'all' ? 'active' : 'bg-white text-gray-600'} px-8">All</button>
                
                <button id="btn-open" onclick="filterIssues('open')" 
                    class="btn join-item lesson-btn rounded-2xl ${currentStatus === 'open' ? 'active' : 'bg-white text-gray-600'} px-8">Open</button>
                
                <button id="btn-closed" onclick="filterIssues('closed')" 
                    class="btn join-item lesson-btn rounded-2xl ${currentStatus === 'closed' ? 'active' : 'bg-white text-gray-600'} px-8">Closed</button>
            </div>
        </div>

        <div class="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center">
            
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xl shadow-inner">
                    <i class="fa-solid fa-bahai animate-spin-slow"></i>
                </div>
                <div>
                    <h2 class="text-2xl font-black text-slate-800">${totalCount} Issues</h2>
                    <p class="text-sm text-slate-400 font-medium">Track and manage your project issues</p>
                </div>
            </div>

            <div class="flex gap-6 items-center">
                <div class="flex items-center gap-2">
                    <span class="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                    <span class="text-sm font-bold text-slate-600">Open: ${openCount}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
                    <span class="text-sm font-bold text-slate-600">Closed: ${closedCount}</span>
                </div>
            </div>
        </div>
    `;
}


const filterIssues = (status) => {
    currentStatus = status;
    const loader = document.getElementById("filter-loader");
    const wordContainer = document.getElementById("word-container");

    const cards = wordContainer.querySelectorAll('div:not(#filter-loader)');
    cards.forEach(card => card.remove());

    if(loader) loader.classList.remove("hidden");

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {
            const allData = json.data;
            
            const filteredData = status === 'all' 
                ? allData 
                : allData.filter(issue => issue.status === status);

            if(loader) loader.classList.add("hidden");

           
            displayFilterButtons(filteredData); 
            
            displayLevelWord(filteredData); 
            handleActiveButton(status);
        })
        .catch(err => {
            console.error("Error:", err);
            if(loader) loader.classList.add("hidden");
        });
}

const handleActiveButton = (status) => {
    removeActive();
    const clickedBtn = document.getElementById(`btn-${status}`);
    if (clickedBtn) {
        clickedBtn.classList.add("active");
        clickedBtn.classList.remove("bg-white", "text-gray-600");
    }
}
// {
//   "status": "success",
//   "message": "Issue fetched successfully",
//   "data": {
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
// }



const loadLevelWord = (id) => {
    // if click all button then calling loadlessons()
    if (id === 'all') {
        loadLessons();
        return;
    }

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLevelWord(data.data));
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    
    
    const cards = wordContainer.querySelectorAll('div:not(#filter-loader)');
    cards.forEach(card => card.remove());

    // if given object then converted array
    const wordsArray = Array.isArray(words) ? words : [words];

    wordsArray.forEach((word) => {
        const card = document.createElement("div");
        card.className = "w-full md:w-80"; // only fixed in card or size measurement


        const isOpen = word.status === "open";
        const topBorderColor = isOpen ? "border-green-400" : "border-purple-400";
        const iconColor = isOpen ? "text-green-400" : "text-purple-400";
        const iconBg = isOpen ? "bg-green-100" : "bg-purple-100";



       card.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-6 space-y-4 border-t-8 ${topBorderColor} text-left h-full flex flex-col transition-all hover:scale-105">
                <div class="flex justify-between items-center">
                    <div class="w-8 h-8 ${iconBg} rounded-full flex items-center justify-center">
                        <i class="fa-solid ${isOpen ? 'fa-circle-dot' : 'fa-circle-check'} ${iconColor}"></i>
                    </div>
                    <span onclick="loadWordByIdForModal(${word.id})"  class="badge ${word.priority === 'high' ? 'badge-error' : 'badge-warning'} badge-sm font-bold uppercase cursor-pointer">
                        ${word.priority}
                    </span>
                </div>

                <div>
                    <h2 class="font-bold text-lg text-gray-800 leading-tight">${word.title}</h2>
                    <p class="text-gray-500 text-xs mt-2 line-clamp-2">${word.description}</p>
                </div>

                <div class="flex gap-2 flex-wrap">
                    ${word.labels.map(label => `
                        <span class="badge badge-outline text-[10px] py-2 border-gray-200 uppercase"># ${label}</span>
                    `).join('')}
                    <span class="badge badge-outline text-[10px] py-2 border-amber-200 text-amber-600 bg-amber-50 font-bold uppercase">
                        <i class="fa-solid fa-circle-question mr-1"></i> Help Wanted
                    </span>
                </div>

                <div class="mt-auto pt-4 border-t border-gray-100">
                    <div class="flex justify-between items-center text-[10px] text-gray-400 font-bold">
                        <span>#${word.id} by ${word.author}</span>
                        <span class="uppercase ${iconColor}">${word.status}</span>
                    </div>
                    <p class="text-[10px] text-gray-400 mt-1">${new Date(word.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        wordContainer.append(card);
    });
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 1.Adding a all button
    const allBtnDiv = document.createElement("div");
    allBtnDiv.innerHTML = `
        <button onclick="loadLevelWord('all')" class="btn btn-primary px-10">All</button>
    `;
    levelContainer.append(allBtnDiv);

    // 2.creating another button using loop
    lessons.forEach(lesson => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button onclick="loadLevelWord('${lesson.id}')" class="btn btn-outline btn-primary ">
                Issue-${lesson.id}
            </button>
        `;
        levelContainer.append(btnDiv);
    });
}






const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("details-container");

    const isOpen = word.status === "open";
    const statusColor = isOpen ? "bg-green-500" : "bg-purple-500";

    detailsBox.innerHTML = `
        <div class="space-y-6">
            <div>
                <h2 class="font-bold text-3xl text-slate-800 mb-2">${word.title}</h2>
                <div class="flex items-center gap-3 text-sm text-slate-500">
                    <span class="${statusColor} text-white px-3 py-1 rounded-full font-bold">
                        ${isOpen ? 'Opened' : 'Closed'}
                    </span>
                    <span>• Opened by <b>${word.author}</b></span>
                    <span>• ${new Date(word.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div class="flex gap-2 border-b pb-4">
                 ${word.labels.map(label => `
                    <span class="badge badge-outline text-xs uppercase font-bold py-3 border-red-200 text-red-400 bg-red-50">
                        <i class="fa-solid fa-bug mr-1"></i> ${label}
                    </span>
                `).join('')}
            </div>

            <div class="py-2">
                <p class="text-slate-600 leading-relaxed text-lg">
                    ${word.description}
                </p>
            </div>

            <div class="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-blue-50">
                <div>
                    <h4 class="text-slate-400 font-bold uppercase text-xs mb-2">Assignee:</h4>
                    <p class="font-black text-slate-800 text-lg">${word.assignee || 'Unassigned'}</p>
                </div>
                <div>
                    <h4 class="text-slate-400 font-bold uppercase text-xs mb-2">Priority:</h4>
                    <span class="badge badge-error font-bold uppercase py-3 px-4">${word.priority}</span>
                </div>
            </div>

            <div class="modal-action">
                <form method="dialog">
                    <button class="btn btn-primary bg-[#422ad5] border-none px-10 text-white font-bold">Close</button>
                </form>
            </div>
        </div>
    `;
    
    
    document.getElementById("my_modal_5").showModal(); //Hence using DaisyUI
}


const handleSearch = () => {
    const searchText = document.getElementById("search-input").value;
    const loader = document.getElementById("filter-loader");
    const wordContainer = document.getElementById("word-container");

    if (!searchText) return; 

    
    const cards = wordContainer.querySelectorAll('div:not(#filter-loader)');
    cards.forEach(card => card.remove());
    if (loader) loader.classList.remove("hidden");

    
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;

    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            const searchResults = json.data;
            if (loader) loader.classList.add("hidden");

            
            displayLevelWord(searchResults);
            displayFilterButtons(searchResults); 
        })
        .catch(err => {
            console.error("Search Error:", err);
            if (loader) loader.classList.add("hidden");
            wordContainer.innerHTML = `<p class="col-span-full text-center py-10">No issues found for "${searchText}"</p>`;
        });
}



loadLessons();