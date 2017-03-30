import * as soap from 'soap';

/*
  Here is the description of the demo WCF service generated by VS:
  {
    "Service1": {
        "BasicHttpBinding_IService1": {
        "GetData": {
            "input": {
            "value": "xs:int"
            },
            "output": {
            "GetDataResult": "xs:string"
            }
        },
        "GetDataUsingDataContract": {
            "input": {
            "composite": "q1:CompositeType"
            },
            "output": {
            "GetDataUsingDataContractResult": "q2:CompositeType"
            }
        }
        }
    }
  }
*/

// The following types have been added to make working with WCF simpler.
// You do not absolutely need them. You could also program against `any`
interface ICompositeType {
    BoolValue: boolean;
    StringValue: string;
}

interface IService1 {
    GetData(arg: { value: number },
        callback: (err: any, result: { GetDataResult: string }) => void): void;
    GetDataUsingDataContract(arg: { composite: ICompositeType },
        callback: (err: any, result: { GetDataUsingDataContractResult: ICompositeType }) => void): void;
}

// Generate WCF client
soap.createClient("http://localhost:51872/Service1.svc?wsdl", {}, (err, client: any) => {
    if (!err) {
        console.log(JSON.stringify(client.describe(), null, 2));

        // Cast to typed client to get IntelliSense
        const typedClient = <IService1>client;

        // Call WCF method
        typedClient.GetData({ value: 42 }, (e, res) => {
            if (!e) {
                console.log(res.GetDataResult);
            }
        });

        typedClient.GetDataUsingDataContract({ composite: { BoolValue: true, StringValue: "Foo" } }, (e, res) => {
            if (!e) {
                console.log(res.GetDataUsingDataContractResult.BoolValue);
                console.log(res.GetDataUsingDataContractResult.StringValue);
            }
        })
    }
});