//Global variables to select the following elements
//Guthub username
const username = "waendesignco";
//1.Div where the profile info will appear
const overview = document.querySelector (".overview");
//2.The repos list
const repoList = document.querySelector (".repo-list");
//3. Section of class of "repos" where all the repo info appears
const allReposContainer = document.querySelector (".repos");
//4. Section with a classs of "repo-data" where the individual repo data will appear
const repoData = document.querySelector (".repo-data");
//5. Back to Repo Gallery button
const backToMainButton = document.querySelector (".view-repos");
//6. Search by name placeholder
const filterInput = document.querySelector (".filter-repos");


//Fetch API jSON data
const gitUserInfo = async function() {
    const userInfo = await fetch (`https://api.github.com/users/${username}`); //Use a template literal - backticks
    const data = await userInfo.json();
    console.log(data);
    displayUserInfo(data);  //call the function displaying the user information, and pass it the JSON data as an argument.
};

gitUserInfo();

//Fetch & display user info
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
        div.innerHTML = `
       <figure>
          <img alt="user avatar" src=${data.avatar_url} />
       </figure>
       <div>
         <p><strong>Name:</strong> ${data.name}</p>
         <p><strong>Bio:</strong> ${data.bio}</p>
         <p><strong>Location:</strong> ${data.location}</p>
         <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
       </div> `;
       overview.append(div);
       gitRepos();
};

//Fetch the repos
const gitRepos = async function() {
    const res = await fetch (`https://api.github.com/users/${username}/repos?sort=updated?per_pase=100`);
    const repoData = await res.json();
    console.log(repoData);
    displayRepos(repoData); //pass jSON response data
};

//Display info about the repos
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");    //search box appear

    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

//Add a click event
repoList.addEventListener ("click", function (e) {
    if (e.target.matches("h3")) {
     const repoName = e.target.innerText;
     getRepoInfo(repoName);
    }
});

//Create a function to get specific repo info
const getRepoInfo = async function (repoName) {
    const response = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await response.json();
    console.log(repoInfo);

    //Fetch languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();   //languageData is an object
    console.log(languageData);
    //Make a list of languages
    const languages = [];  
    for (const language in languageData) {   //for...in loop to specify which part of the object property to loop over
        languages.push(language);    //.push()to add one or more elements to the end of an array
    }

    displayRepoInfo(repoInfo, languages);
};

//Create a function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";  //empty repo-data
  repoData.classList.remove("hide");   //appear
  allReposContainer.classList.add("hide");   
  const div = document.createElement("div");
  div.innerHTML = `
       <h3> Name: ${repoInfo.name}</h3>
         <p>Description: ${repoInfo.description}</p>
         <p>Default Branch: ${repoInfo.default_branch}</p>
         <p>Languages: ${languages.join(", ")}</p>
         <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
  backToMainButton.classList.remove("hide");    //appear
repoData.append(div);
};

//Add a click event to the back rutton
backToMainButton.addEventListener ("click", function (e) {
    allReposContainer.classList.remove("hide");  //appear
    repoData.classList.add("hide");   //hide specific repo info
    backToMainButton.classList.add("hide");    //hide
});

//Add an input event to search box
filterInput.addEventListener ("input", function (e) {
    const searchText = e.target.value;  //grab what was entered in the input
    const repos = document.querySelectorAll(".repo") //select all element on the page with a class of "repo"
    const searchLowerText = searchText.toLowerCase();  

    for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchLowerText)) {
          repo.classList.remove("hide");
        } else {
          repo.classList.add("hide");  
        }   
    }
});
