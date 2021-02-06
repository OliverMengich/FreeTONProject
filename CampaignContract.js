const abi={
	"ABI version": 2,
	"header": ["time"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{"name":"minimum","type":"uint256"},
				{"name":"creator","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "createRequest",
			"inputs": [
				{"name":"description","type":"bytes"},
				{"name":"value","type":"uint128"},
				{"name":"receipient","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "approveRequest",
			"inputs": [
				{"name":"index","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "Contribute",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "finalizeRequest",
			"inputs": [
				{"name":"index","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "manager",
			"inputs": [
			],
			"outputs": [
				{"name":"manager","type":"address"}
			]
		},
		{
			"name": "minimumContribution",
			"inputs": [
			],
			"outputs": [
				{"name":"minimumContribution","type":"uint256"}
			]
		},
		{
			"name": "approvers",
			"inputs": [
			],
			"outputs": [
				{"name":"approvers","type":"map(address,bool)"}
			]
		},
		{
			"name": "approversCount",
			"inputs": [
			],
			"outputs": [
				{"name":"approversCount","type":"uint256"}
			]
		}
	],
	"data": [
	],
	"events": [
	]
}
