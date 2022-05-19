import { readFile } from 'fs/promises';
const policeData = JSON.parse(
  await readFile(
    new URL('../files/data.json', import.meta.url)
  )
);

const neighbourhoodsList = (district1) =>{

  let neighbourhoodList1 = {}  
  policeData.forEach((item) => {
    if (item.attributes.Division === district1) {
        if (!neighbourhoodList1[item.attributes.Neighbourhood]) {
            neighbourhoodList1[item.attributes.Neighbourhood] = item.attributes.Neighbourhood;
        }
    }
  });

  return  neighbourhoodList1
}

export default neighbourhoodsList;