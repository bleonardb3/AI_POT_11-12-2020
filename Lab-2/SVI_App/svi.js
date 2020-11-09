const argv = require('yargs').argv
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
let entity_count = []
var length = 0;
let status = 0;
let household = 0;
let minority = 0
let housing = 0
let SVI = []



const ReadFile = ( folder ) => {


    let city = path.join(__dirname, folder)
    fs.readdir(city, (err, files) => {
        if(err){
            console.log(chalk.red('Folder Not Found'))
        }else{
            files.forEach((file, index) => {

                fs.readFile(path.join(__dirname,folder,file), 'utf8', (err, contents) => {
                    if(err){
                        console.log(chalk.red('File Not Found'))
                    }else if(file.includes('.json')){
                        let document = JSON.parse(contents)
                        length = files.length - 1 //because folder now hold DS.store file
                            getEntity(document.enriched_text.entities)
                    }


                })
            })
        }

    } )

   // fs.readdir(__dirname)

}

// fs.readFile(path.join(__dirname,'..','Seattle-Discovery','discovery-97.json'), 'utf8', (err, contnets)=> {
//     let document = JSON.parse(contnets)
//     length = 6
//     setTimeout(() =>  getEntity(document.enriched_text.entities), 1000)

// })

 /* create array with just the types, then filter(item, index) return indexof(item) == index,
     then for each item in this array push the Enentiyarr[index] to another array, use this array to run pushCount()*/
const getEntity = (entities) => {
    //console.log(entities.length)
    let typeArr = []
    let unique = []

    entities.forEach(entity => {
        typeArr.push(entity.type)
    })

    typeArr.forEach((item, index) => {
        if(typeArr.indexOf(item) == index){
            unique.push(entities[index])
        }
    })

    unique.forEach(entity => pushCount(entity.type))


}

const pushCount = (type) => {
    if(entity_count.some(e => e.type == type)){
        entity_count.forEach(entity => {
            if (entity.type == type) {

                entity['avg'] = (((entity.avg * length) + 1)/length)
            }
        })
    }else{
        entity_count.push({'type':type, 'avg': 1/length})
    }
}

//outputs the final status value
const calculateStatus = () => {
    let weightedArr = [{'type': 'Unemployed', 'weight':0.5, 'value': 0},
                    {'type':'No_Health_Insurance', 'weight': 0.5, 'value': 0},
                     {'type': 'Medically_insured', 'weight': -0.5, 'value':0},
                    {'type': 'Full_Time_Employment', 'weight': -0.5, 'value':0}]
    entity_count.forEach(entity => {
        switch (entity.type){
            case 'Unemployed':
                weightedArr.forEach(entry => entry.type == 'Unemployed' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break;
            case 'No_Health_Insurance':
                weightedArr.forEach(entry => entry.type == 'No_Health_Insurance' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break;
            case 'Medically_Insured':
                weightedArr.forEach(entry => entry.type == 'Medically_Insured' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break
            case 'Full_Time_Employment':
                weightedArr.forEach(entry => entry.type == 'Full_Time_Employment' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break
        }
    })
    let  sum = 0
     weightedArr.forEach(value => {
        sum += value.value
       // console.log(value)
     })
     status = sum
     return
}


const calculateHousehold =  () => {
    let weightedArr = [{'type': 'Senior_Citizen', 'weight':0.35, 'value': 0},
                    {'type':'Minor', 'weight': 0.25, 'value': 0},
                     {'type': 'Disabled', 'weight': 0.20, 'value':0},
                     {'type': 'Single_Parent', 'weight': 0.15, 'value':0},
                     {'type': 'No_High_School_Diploma', 'weight': 0.05, 'value':0},
                    {'type': 'High_School_Student', 'weight': -0.2, 'value':0},
                    {'type': 'University_Student', 'weight': -0.3, 'value':0}
                ]
    entity_count.forEach(entity => {
        switch (entity.type){
            case 'Senior_Citizen':
                weightedArr.forEach(entry => entry.type == 'Senior_Citizen' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break;
            case 'Minor':
                weightedArr.forEach(entry => entry.type == 'Minor' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break;
            case 'Disabled':
                weightedArr.forEach(entry => entry.type == 'Disabled' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break
            case 'Single_Parent':
                weightedArr.forEach(entry => entry.type == 'Single_Parent' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break
            case 'No_High_School_Diploma':
                weightedArr.forEach(entry => entry.type == 'No_High_School_Diploma' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break
            case 'High_School_Student':
                weightedArr.forEach(entry => entry.type == 'High_School_Student' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break
            case 'University_Student':
                 weightedArr.forEach(entry => entry.type == 'University_Student' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                 break

        }
    })
    let  sum = 0
     weightedArr.forEach(value => {
        sum += value.value
        //console.log(value)
     })
     household = sum
     return
}

const calculateMinority = () => {
    let weightedArr = [{'type': 'Minority', 'weight':0.6, 'value': 0},
                    {'type':'ESL_Speaker', 'weight': 0.4, 'value': 0},
                ]
    entity_count.forEach(entity => {
        switch (entity.type){
            case 'Minority':
                weightedArr.forEach(entry => entry.type == 'Minority' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break;
            case 'ESL_Speaker':
                weightedArr.forEach(entry => entry.type == 'ESL_Speaker' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break;
        }
    })
    let  sum = 0
     weightedArr.forEach(value => {
        sum += value.value
        //console.log(value)
     })
     minority = sum
     return
}

const calculateHouse = () => {
    let weightedArr = [{'type': 'Mobile_Home_Owner', 'weight':0.5, 'value': 0},
                    {'type':'Crowded_Living', 'weight': 0.3, 'value': 0},
                     {'type': 'No_Vehicle', 'weight': 0.20, 'value':0},
                     {'type': 'Apartment_Renter', 'weight': -0.25, 'value':0},
                     {'type': 'Home_Owner', 'weight': -0.65, 'value':0},
                    {'type': 'Car_Owner', 'weight': -0.1, 'value':0}
                ]
    entity_count.forEach(entity => {
        switch (entity.type){
            case 'Mobile_Home_Owner':
                weightedArr.forEach(entry => entry.type == 'Mobile_Home_Owner' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break;
            case 'Crowded_Living':
                weightedArr.forEach(entry => entry.type == 'Crowded_Living' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break;
            case 'No_Vehicle':
                weightedArr.forEach(entry => entry.type == 'No_Vehicle' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break
            case 'Apartment_Renter':
                weightedArr.forEach(entry => entry.type == 'Apartment_Renter' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break
            case 'Home_Owner':
                weightedArr.forEach(entry => entry.type == 'Home_Owner' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break
            case 'Car_Owner':
                weightedArr.forEach(entry => entry.type == 'Car_Owner' ? entry['value'] += entity.avg * entry.weight : entry['value'])
                break
        }
    })
    let  sum = 0
     weightedArr.forEach(value => {
        sum += value.value
       // console.log(value)
     })
     housing = sum
     return
}

const finalCalc = () => {
    SVI = ((status * 0.4) + (household * 0.3) + (minority * 0.2) + (housing * 0.1)) * 100
    console.log(chalk.green(`SVI:  ${SVI.toFixed(3)}`))
    SVI = 0
    length = 0;
    status = 0;
    household = 0;
    minority = 0
    housing = 0

}


const main =  async () => {
    //console.log(argv._[0])
    //let testArr = ['Seattle-Discovery-test', 'Seattle-Discovery-test-2'] argv._.length

    for (let i =0; i<argv._.length; i++){
            let time = 3000*(i)

        setTimeout(() => {
            ReadFile(argv._[i])
            //console.log(`just ran readfile of ${argv._[i]}`)
        }, time)
        setTimeout(() => {
            calculateStatus()
             calculateHousehold()
             calculateMinority
             calculateHouse()
           //  console.log(`just ran calcualtions ${argv._[i]}`)
        }, time + 1000)
        setTimeout(() => {
            console.log(`Running calculations for ${argv._[i]}...`)
            finalCalc()
        }, time+2000)



    }
}




 main()
