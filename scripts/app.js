async function connectToMetaMask(){
    const account = await ethereum.request({method: 'eth_requestAccounts'})
    //console.log(account);
    alert("Connected to: "+account)
}
//connectToMetaMask = () => {}

//creating a function which is gonna take values from issuing page

let contractAddress= "0xf89d33827e87054d7Fb746D9D99417fC8447c5A4"

let contractAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_certificateId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_courseName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_candidateName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_grade",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			}
		],
		"name": "issueCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "certificateDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "courseName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "candidateName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "grade",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

window.onload = () => {
    web3 = new Web3(ethereum)
    ContractInstance = new web3.eth.Contract(contractAbi, contractAddress)
    //remove const if scope has to be global 
}

issueCertificate = async () => {
    let certificateID = document.getElementById('certificateID').value
    let candidateName = document.getElementById('candidateName').value
    let courseName = document.getElementById('courseName').value
    let grade = document.getElementById('grade').value
    let date = document.getElementById('date').value
    console.log(certificateID, candidateName, courseName, grade, date)
    let account = await ethereum.request({method: 'eth_requestAccounts'})
    let trxReceipt = await ContractInstance.methods.issueCertificate(certificateID, courseName, candidateName, grade, date).send({from: account[0], gasLimit: 987000})
      //we need data in order:
    //this is like a path (up) . instead of /
    console.log(trxReceipt)
}

//another fuction to view the certificate
getCertificate = async () => {
    let certificateID = document.getElementById('certificateID').value
    //console.log(certificateID)
    let result = await ContractInstance.methods.certificateDetails(certificateID).call()
    //instead of .send() 
    //console.log(result)
    //storing data in js storage
    localStorage.setItem("certifictateID", certificateID)//takes two arguements varname & value
    localStorage.setItem("candidateName", result.candidateName)
    localStorage.setItem("courseName", result.courseName)
    localStorage.setItem("grade", result.grade)
    localStorage.setItem("date", result.date)
    window.location.href = "viewCertificate.html"
}

//okay




