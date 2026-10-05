let DATA = {};

async function loadData(){

    const r =
        await fetch(
            "/api/classdata"
        );

    DATA =
        await r.json();

    message.value =
        DATA.message || "";

    banner.value =
        DATA.banner || "";

    const s =
        DATA.specials;

    m0.value=s[0];
    m1.value=s[1];
    m2.value=s[2];
    m3.value=s[3];
    m4.value=s[4];

    renderEvents();

}

async function saveAll(){

    DATA.message =
        message.value;

    DATA.banner =
        banner.value;

    DATA.specials = [
        m0.value,
        m1.value,
        m2.value,
        m3.value,
        m4.value
    ];

    await fetch(
        "/api/save",
        {
            method:"POST",
            headers:{
                "Content-Type":
                    "application/json"
            },
            body:
                JSON.stringify(DATA)
        }
    );

    alert(
        "Saved!"
    );

}

function addEvent(){

    DATA.events =
        DATA.events || [];

    DATA.events.push({
        title:eventTitle.value,
        date:eventDate.value
    });

    eventTitle.value="";

    renderEvents();

}

function renderEvents(){

    events.innerHTML="";

    (
        DATA.events || []
    ).forEach(
        (e,i)=>{
            const d=
                document.createElement("div");

            d.innerHTML=
                `${e.date} - ${e.title}
                 <button onclick="removeEvent(${i})">
                 Delete
                 </button>`;

            events.appendChild(d);
        }
    );

}

function removeEvent(i){

    DATA.events.splice(i,1);

    renderEvents();

}

loadData();
