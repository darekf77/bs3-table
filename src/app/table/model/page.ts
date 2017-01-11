export interface Page {
    /**
     * Current page number, 0 start
     */
    number: number;
    /**
     * Number of rows
     */
    size: number;
    /**
     * Size of all elements in database
     */
    totalElements: number;
    
    totalPages?: number;
};
