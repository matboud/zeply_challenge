// to interact with adresses table
import {Database} from "sqlite3";
import {SearchQueryDetails} from "../types/blockchainTypes";

export const upsertSearchQuery = (
    db: Database,
    searchQueryDetails: SearchQueryDetails
): void => {
    const {queryValue, queryType} = searchQueryDetails;
    db.run(
        `INSERT INTO search_query (query_type, query_value, score)
         VALUES ($query_type, $query_value, 1)
         ON CONFLICT(query_type, query_value) 
             DO UPDATE SET score = score + 1, updated_at = CURRENT_TIMESTAMP
             where query_type = $query_type and query_value=$query_value
             `,
        {
            $query_type: queryType,
            $query_value: queryValue,
        },
        function (err) {
            if (err) {
                console.error('Error:', err);
            } else {
                console.log('Record inserted or updated successfully.');
            }
        });
};


export const getAllSearchQueriesByType = (db: Database, queryType: string): Promise<any[]> => {
    return new Promise<any[]>((resolve, reject) => {
        db.all(
            'SELECT * FROM search_query where query_type = $query_type ORDER BY score DESC limit 5',
            {
                $query_type: queryType,
            },
            (err: Error | null, rows: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

