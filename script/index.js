console.log("Hello github issues");

const loadLessons = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {
            displayLesson(json.data);     
            displayLevelWord(json.data);   // See starting all card
        });
}

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

        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-6 space-y-4 border border-gray-100 text-left h-full">
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

                <div class="text-gray-400 text-xs font-medium mt-auto">
                    <p>#${word.id} by ${word.author}</p>
                    <p>${new Date(word.createdAt).toLocaleDateString()}</p>
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