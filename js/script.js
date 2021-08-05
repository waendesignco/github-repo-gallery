//Global variables to select the following elements
//1.Div where the profile info will appear
const overview = document.querySelector (".overview");
//Guthub username
const username = "waendesignco";
//2.The repos list
const repoList = document.querySelector (".repo-list");
//3. Section of class of "repos" where all the repo info appears
const allReposContainer = document.querySelector (".repos");
//4. Section with a classs of "repo-data" where the individual repo data will appear
const repoData = document.querySelector (".repo-data");

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
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList. add("repo");
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
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    //Make a lis of languages
    const languages = [];
    for (const language of languageData) {
        languages.push(language);
    }

        
};




