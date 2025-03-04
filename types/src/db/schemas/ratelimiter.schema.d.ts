export declare const rateLimiterFlexible: import("drizzle-orm/pg-core").PgTableWithColumns<{
  name: "rate_limiter_flexible";
  schema: undefined;
  columns: {
    key: import("drizzle-orm/pg-core").PgColumn<
      {
        name: "key";
        tableName: "rate_limiter_flexible";
        dataType: "string";
        columnType: "PgText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
    points: import("drizzle-orm/pg-core").PgColumn<
      {
        name: "points";
        tableName: "rate_limiter_flexible";
        dataType: "number";
        columnType: "PgInteger";
        data: number;
        driverParam: string | number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
    expire: import("drizzle-orm/pg-core").PgColumn<
      {
        name: "expire";
        tableName: "rate_limiter_flexible";
        dataType: "date";
        columnType: "PgTimestamp";
        data: Date;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
  };
  dialect: "pg";
}>;
export type RateLimiterRecord = typeof rateLimiterFlexible.$inferSelect;
