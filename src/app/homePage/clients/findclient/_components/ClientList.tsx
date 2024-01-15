import { ClientDto } from "../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import AddClientButton from "@/app/homePage/clients/findclient/_components/AddClientButton";
import ClientSummary from "@/app/homePage/clients/findclient/_components/ClientSummary";

export default function ClientList({ clients }: { clients: ClientDto[] }) {
    return (
        <div>
            <AddClientButton/>

                <div className="flex items-center justify-center">
                    <ul>
                        {clients.map((client) =>
                            (
                            <div key={client.id}>
                                <ClientSummary client={client}/>
                            </div>
                        ))
                        }
                    </ul>
                </div>
        </div>



    );
}



