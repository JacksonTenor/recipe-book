function deleteRecipe(id){
    console.log("deleting...");
    console.log('/recipes/' + id);
    let req = new XMLHttpRequest();
    req.open("DELETE", 'http://localhost:3001/recipes/' + id);
    req.send();
    location.reload(true);
}