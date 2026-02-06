export default function DataTable({
    columns,
    data,
    actions
}: {
    columns: string[],
    data: any[],
    actions?: (item: any) => React.ReactNode
}) {
    return (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 bg-gray-800">
                <thead className="bg-gray-900">
                    <tr>
                        {columns.map((col) => (
                            <th key={col} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                                {col}
                            </th>
                        ))}
                        {actions && <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Actions</span></th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800">
                    {data.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-700/50 transition-colors">
                            {Object.values(item).map((val: any, valIdx) => (
                                <td key={valIdx} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-300 sm:pl-6">
                                    {/* Basic rendering logic that can be expanded */}
                                    {val}
                                </td>
                            ))}
                            {actions && (
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    {actions(item)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
