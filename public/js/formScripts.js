async function submitReg(event)
{
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const user_name = document.getElementById("user_name").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
    const response = await fetch("/register", 
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, user_name, password})
            }
        );

    const data = await response.json();
    alert(data.message);

    window.location.href = "/login";
    } catch(err) {
    console.error("Request Failed", err);
    alert("Something went wrong, try again");
    }

}

async function submitLog(event)
{
    event.preventDefault();

    const user_name = document.getElementById("user_name").value.trim();
    const password = document.getElementById("password").value.trim();
    
    try 
    {
    const response = await fetch("/login", 
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user_name, password})
            }
        )

    const data = await response.json();

    alert(data.message);
    } catch(err) 
    {
        console.error("Request Failed", err);
        alert("Something went wrong, try again");
    }

    window.location.href = "/";
}

async function logOut()
{
    const response = await fetch("/logout", {method: "POST"});

    const data = await response.json();

    if(!response.ok){
        alert(data.message);
        return;
    }

    alert(data.message);

    window.location.href = "/";
}