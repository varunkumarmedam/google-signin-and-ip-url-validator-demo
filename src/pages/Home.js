import { useState } from "react"
import { toast } from "react-toastify";
import GlitchTitleText from "../components/GlitchTitleText";
import { FaRegClipboard } from 'react-icons/fa'; // Import the Font Awesome Clipboard icon

export default function Home({ user, logout }) {
    const [input, setInput] = useState('');
    const [tableData, setTableData] = useState({ ips: [], urls: [] });

    // Triggers when user clicks Submit button
    const submitInput = () => {
        const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

        // Extracting all the values seperated by space
        const inputValues = input.split(" ").filter((val) => val !== "");

        // Filtering IPs and URLs using Regex
        const ips = inputValues.filter((val) => ipv4Regex.test(val));
        const urls = inputValues.filter((val) => urlRegex.test(val));

        const newData = { ...tableData }; // Adding existing table data 

        // If IPs found in the input string
        if (ips.length) {
            newData.ips.push(...ips);
            toast(`Added ${ips.length} IPs`);
        }

        // If URLs found in the input string
        if (urls.length) {
            newData.urls.push(...urls);
            toast(`Added ${urls.length} URLs`);
        }

        // Calculating invalid values found
        const invalidValues = inputValues.length - ips.length - urls.length;
        if (invalidValues) {
            toast(`${invalidValues} invalid values found`, {
                type: "error"
            })
        }

        setTableData(newData); // Updating table data
        setInput(""); // Clearing input field value
    }

    // Triggers when clipboard icon btn clicked inside the table row 
    const copyToClipboard = (val) => {
        navigator.clipboard.writeText(val).then(() => {
            toast("Copied to clipboard", { autoClose: 1000 })
        })
    }

    return <>
        {/* Page Header */}
        <div className="d-flex align-items-center justify-content-center">
            <div className="font-weight-bold display-6 m-2">Hello</div>
            <GlitchTitleText text={user.name} />
        </div>
        <button className="btn btn-danger logout-btn" onClick={() => logout()}>Logout ({user.email})</button>

        {/* Input field and Button */}
        <div className="d-flex justify-content-center col-sm-12">
            <div className="col-sm-8">
                <input className="shadow form-control form-control-lg" placeholder="Enter IPs or URLs with space seperated" value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <button className="shadow col-sm-2 btn btn-success" disabled={input == ""} onClick={() => submitInput()}>Submit</button>
        </div>

        {/* Data tables */}
        <div className="d-flex justify-content-around align-items-start container mt-5">

            {/* IPs Table */}
            {tableData.ips.length != 0 &&
                <div className="col-sm-5">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>IPs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.ips.map((ip, index) =>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td className="d-flex justify-content-between align-items-center">
                                        <div></div>
                                        <div>{ip}</div>
                                        <button className="btn btn-sm border rounded" onClick={() => copyToClipboard(ip)}><FaRegClipboard /></button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }

            {/* URLs Table */}
            {tableData.urls.length != 0 &&
                <div className="col-sm-5 table-wrapper">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>URLs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.urls.map((url, index) =>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td className="d-flex justify-content-between align-items-center max-w-400">
                                        <div></div>
                                        <div className="text-truncate">{url}</div>
                                        <button className="btn btn-sm border rounded" onClick={() => copyToClipboard(url)}><FaRegClipboard /></button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    </>
};
