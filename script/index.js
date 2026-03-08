console.log("Hello github issues");

const loadLessons = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {
            displayLesson(json.data);  
            
            displayFilterButtons();
            
            displayLevelWord(json.data);   // See starting all card
        });
}


// 2.creating all,open,closed button
const displayFilterButtons = () => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = `
        <div class="join border border-gray-200">
            <button onclick="filterIssues('all')" class="btn join-item btn-primary px-8">All</button>
            <button onclick="filterIssues('open')" class="btn join-item btn-outline btn-success">Open</button>
            <button onclick="filterIssues('closed')" class="btn join-item btn-outline btn-secondary">Closed</button>
        </div>
    `;
}





const filterIssues = (status) => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {
            if (status === 'all') {
                displayLevelWord(json.data);
            } else {
                const filteredData = json.data.filter(issue => issue.status === status);
                displayLevelWord(filteredData);
            }
        });
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
    wordContainer.innerHTML = "";

    // if given object then converted array
    const wordsArray = Array.isArray(words) ? words : [words];

    wordsArray.forEach((word) => {
        const card = document.createElement("div");
        card.className = "w-full md:w-80"; // only fixed in card or size measurement


        const isOpen = word.status === "open";
        const topBorderColor = isOpen ? "border-green-500" : "border-purple-500";
        const iconColor = isOpen ? "text-green-500" : "text-purple-500";
        const iconBg = isOpen ? "bg-green-100" : "bg-purple-100";



       card.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-6 space-y-4 border-t-8 ${topBorderColor} text-left h-full flex flex-col transition-all hover:scale-105">
                <div class="flex justify-between items-center">
                    <div class="w-8 h-8 ${iconBg} rounded-full flex items-center justify-center">
                        <i class="fa-solid ${isOpen ? 'fa-circle-dot' : 'fa-circle-check'} ${iconColor}"></i>
                    </div>
                    <span class="badge ${word.priority === 'high' ? 'badge-error' : 'badge-warning'} badge-sm font-bold uppercase">
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
            <button onclick="loadLevelWord('${lesson.id}')" class="btn btn-outline btn-primary">
                Issue-${lesson.id}
            </button>
        `;
        levelContainer.append(btnDiv);
    });
}

loadLessons();