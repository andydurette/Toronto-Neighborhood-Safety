const API = {
  // Grabs the list of police division from the server and returns it to the front end.
  async districtInfoCheck() {
      const res = await fetch(`/api/districtInfoCheck`);
      const json = await res.json();
      return json
  },
  async neighbourhoodsList(district) {
      const res = await fetch("/api/neighbourhoodsList", {
      method: "POST",
      body: JSON.stringify({district}),
      headers: { "Content-Type": "application/json" }
      });
  
      const json = await res.json();
      return json
  },
  async neighbourhoodCompare(e) {
      let neighbourhood1 = e.srcElement.neighbourhood1.value;
      let neighbourhood2 = e.srcElement.neighbourhood2.value;
      const res = await fetch("/api/neighbourhoodsCompare", {
          method: "POST",
          body: JSON.stringify({neighbourhood1,neighbourhood2}),
          headers: { "Content-Type": "application/json" }
          });
      
          const json = await res.json();
          console.log(json);
          return json
  },
  async neighbourhoodYearCompare(e) {
    let neighbourhood = e.srcElement.neighbourhoodYearCompare.value;
    let year1 = e.srcElement.year1.value;
    let year2 = e.srcElement.year2.value;
    
    const res = await fetch("/api/neighbourhoodYearCompare", {
        method: "POST",
        body: JSON.stringify({neighbourhood, year1, year2}),
        headers: { "Content-Type": "application/json" }
        });
    
        const json = await res.json();
      //  console.log(json);
        return json
}
}