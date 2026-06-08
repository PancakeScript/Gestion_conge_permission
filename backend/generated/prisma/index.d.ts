
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model demandes_conge
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type demandes_conge = $Result.DefaultSelection<Prisma.$demandes_congePayload>
/**
 * Model departement
 * 
 */
export type departement = $Result.DefaultSelection<Prisma.$departementPayload>
/**
 * Model employe
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type employe = $Result.DefaultSelection<Prisma.$employePayload>
/**
 * Model jours_feries
 * 
 */
export type jours_feries = $Result.DefaultSelection<Prisma.$jours_feriesPayload>
/**
 * Model manager
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type manager = $Result.DefaultSelection<Prisma.$managerPayload>
/**
 * Model notification
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type notification = $Result.DefaultSelection<Prisma.$notificationPayload>
/**
 * Model rh
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type rh = $Result.DefaultSelection<Prisma.$rhPayload>
/**
 * Model types_conge
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type types_conge = $Result.DefaultSelection<Prisma.$types_congePayload>
/**
 * Model utilisateur
 * 
 */
export type utilisateur = $Result.DefaultSelection<Prisma.$utilisateurPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Demandes_conges
 * const demandes_conges = await prisma.demandes_conge.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Demandes_conges
   * const demandes_conges = await prisma.demandes_conge.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.demandes_conge`: Exposes CRUD operations for the **demandes_conge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Demandes_conges
    * const demandes_conges = await prisma.demandes_conge.findMany()
    * ```
    */
  get demandes_conge(): Prisma.demandes_congeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.departement`: Exposes CRUD operations for the **departement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departements
    * const departements = await prisma.departement.findMany()
    * ```
    */
  get departement(): Prisma.departementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employe`: Exposes CRUD operations for the **employe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employes
    * const employes = await prisma.employe.findMany()
    * ```
    */
  get employe(): Prisma.employeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jours_feries`: Exposes CRUD operations for the **jours_feries** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jours_feries
    * const jours_feries = await prisma.jours_feries.findMany()
    * ```
    */
  get jours_feries(): Prisma.jours_feriesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.manager`: Exposes CRUD operations for the **manager** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Managers
    * const managers = await prisma.manager.findMany()
    * ```
    */
  get manager(): Prisma.managerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.notificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rh`: Exposes CRUD operations for the **rh** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rhs
    * const rhs = await prisma.rh.findMany()
    * ```
    */
  get rh(): Prisma.rhDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.types_conge`: Exposes CRUD operations for the **types_conge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Types_conges
    * const types_conges = await prisma.types_conge.findMany()
    * ```
    */
  get types_conge(): Prisma.types_congeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.utilisateur`: Exposes CRUD operations for the **utilisateur** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Utilisateurs
    * const utilisateurs = await prisma.utilisateur.findMany()
    * ```
    */
  get utilisateur(): Prisma.utilisateurDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    demandes_conge: 'demandes_conge',
    departement: 'departement',
    employe: 'employe',
    jours_feries: 'jours_feries',
    manager: 'manager',
    notification: 'notification',
    rh: 'rh',
    types_conge: 'types_conge',
    utilisateur: 'utilisateur'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "demandes_conge" | "departement" | "employe" | "jours_feries" | "manager" | "notification" | "rh" | "types_conge" | "utilisateur"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      demandes_conge: {
        payload: Prisma.$demandes_congePayload<ExtArgs>
        fields: Prisma.demandes_congeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.demandes_congeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_congePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.demandes_congeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_congePayload>
          }
          findFirst: {
            args: Prisma.demandes_congeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_congePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.demandes_congeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_congePayload>
          }
          findMany: {
            args: Prisma.demandes_congeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_congePayload>[]
          }
          create: {
            args: Prisma.demandes_congeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_congePayload>
          }
          createMany: {
            args: Prisma.demandes_congeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.demandes_congeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_congePayload>[]
          }
          delete: {
            args: Prisma.demandes_congeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_congePayload>
          }
          update: {
            args: Prisma.demandes_congeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_congePayload>
          }
          deleteMany: {
            args: Prisma.demandes_congeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.demandes_congeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.demandes_congeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_congePayload>[]
          }
          upsert: {
            args: Prisma.demandes_congeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_congePayload>
          }
          aggregate: {
            args: Prisma.Demandes_congeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDemandes_conge>
          }
          groupBy: {
            args: Prisma.demandes_congeGroupByArgs<ExtArgs>
            result: $Utils.Optional<Demandes_congeGroupByOutputType>[]
          }
          count: {
            args: Prisma.demandes_congeCountArgs<ExtArgs>
            result: $Utils.Optional<Demandes_congeCountAggregateOutputType> | number
          }
        }
      }
      departement: {
        payload: Prisma.$departementPayload<ExtArgs>
        fields: Prisma.departementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.departementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.departementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departementPayload>
          }
          findFirst: {
            args: Prisma.departementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.departementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departementPayload>
          }
          findMany: {
            args: Prisma.departementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departementPayload>[]
          }
          create: {
            args: Prisma.departementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departementPayload>
          }
          createMany: {
            args: Prisma.departementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.departementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departementPayload>[]
          }
          delete: {
            args: Prisma.departementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departementPayload>
          }
          update: {
            args: Prisma.departementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departementPayload>
          }
          deleteMany: {
            args: Prisma.departementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.departementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.departementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departementPayload>[]
          }
          upsert: {
            args: Prisma.departementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departementPayload>
          }
          aggregate: {
            args: Prisma.DepartementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartement>
          }
          groupBy: {
            args: Prisma.departementGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartementGroupByOutputType>[]
          }
          count: {
            args: Prisma.departementCountArgs<ExtArgs>
            result: $Utils.Optional<DepartementCountAggregateOutputType> | number
          }
        }
      }
      employe: {
        payload: Prisma.$employePayload<ExtArgs>
        fields: Prisma.employeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.employeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.employeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employePayload>
          }
          findFirst: {
            args: Prisma.employeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.employeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employePayload>
          }
          findMany: {
            args: Prisma.employeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employePayload>[]
          }
          create: {
            args: Prisma.employeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employePayload>
          }
          createMany: {
            args: Prisma.employeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.employeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employePayload>[]
          }
          delete: {
            args: Prisma.employeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employePayload>
          }
          update: {
            args: Prisma.employeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employePayload>
          }
          deleteMany: {
            args: Prisma.employeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.employeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.employeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employePayload>[]
          }
          upsert: {
            args: Prisma.employeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employePayload>
          }
          aggregate: {
            args: Prisma.EmployeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmploye>
          }
          groupBy: {
            args: Prisma.employeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeGroupByOutputType>[]
          }
          count: {
            args: Prisma.employeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeCountAggregateOutputType> | number
          }
        }
      }
      jours_feries: {
        payload: Prisma.$jours_feriesPayload<ExtArgs>
        fields: Prisma.jours_feriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.jours_feriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jours_feriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.jours_feriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jours_feriesPayload>
          }
          findFirst: {
            args: Prisma.jours_feriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jours_feriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.jours_feriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jours_feriesPayload>
          }
          findMany: {
            args: Prisma.jours_feriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jours_feriesPayload>[]
          }
          create: {
            args: Prisma.jours_feriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jours_feriesPayload>
          }
          createMany: {
            args: Prisma.jours_feriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.jours_feriesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jours_feriesPayload>[]
          }
          delete: {
            args: Prisma.jours_feriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jours_feriesPayload>
          }
          update: {
            args: Prisma.jours_feriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jours_feriesPayload>
          }
          deleteMany: {
            args: Prisma.jours_feriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.jours_feriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.jours_feriesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jours_feriesPayload>[]
          }
          upsert: {
            args: Prisma.jours_feriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jours_feriesPayload>
          }
          aggregate: {
            args: Prisma.Jours_feriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJours_feries>
          }
          groupBy: {
            args: Prisma.jours_feriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Jours_feriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.jours_feriesCountArgs<ExtArgs>
            result: $Utils.Optional<Jours_feriesCountAggregateOutputType> | number
          }
        }
      }
      manager: {
        payload: Prisma.$managerPayload<ExtArgs>
        fields: Prisma.managerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.managerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$managerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.managerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$managerPayload>
          }
          findFirst: {
            args: Prisma.managerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$managerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.managerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$managerPayload>
          }
          findMany: {
            args: Prisma.managerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$managerPayload>[]
          }
          create: {
            args: Prisma.managerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$managerPayload>
          }
          createMany: {
            args: Prisma.managerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.managerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$managerPayload>[]
          }
          delete: {
            args: Prisma.managerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$managerPayload>
          }
          update: {
            args: Prisma.managerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$managerPayload>
          }
          deleteMany: {
            args: Prisma.managerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.managerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.managerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$managerPayload>[]
          }
          upsert: {
            args: Prisma.managerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$managerPayload>
          }
          aggregate: {
            args: Prisma.ManagerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateManager>
          }
          groupBy: {
            args: Prisma.managerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ManagerGroupByOutputType>[]
          }
          count: {
            args: Prisma.managerCountArgs<ExtArgs>
            result: $Utils.Optional<ManagerCountAggregateOutputType> | number
          }
        }
      }
      notification: {
        payload: Prisma.$notificationPayload<ExtArgs>
        fields: Prisma.notificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.notificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.notificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationPayload>
          }
          findFirst: {
            args: Prisma.notificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.notificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationPayload>
          }
          findMany: {
            args: Prisma.notificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationPayload>[]
          }
          create: {
            args: Prisma.notificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationPayload>
          }
          createMany: {
            args: Prisma.notificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.notificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationPayload>[]
          }
          delete: {
            args: Prisma.notificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationPayload>
          }
          update: {
            args: Prisma.notificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationPayload>
          }
          deleteMany: {
            args: Prisma.notificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.notificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.notificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationPayload>[]
          }
          upsert: {
            args: Prisma.notificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.notificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.notificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      rh: {
        payload: Prisma.$rhPayload<ExtArgs>
        fields: Prisma.rhFieldRefs
        operations: {
          findUnique: {
            args: Prisma.rhFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rhPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.rhFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rhPayload>
          }
          findFirst: {
            args: Prisma.rhFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rhPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.rhFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rhPayload>
          }
          findMany: {
            args: Prisma.rhFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rhPayload>[]
          }
          create: {
            args: Prisma.rhCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rhPayload>
          }
          createMany: {
            args: Prisma.rhCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.rhCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rhPayload>[]
          }
          delete: {
            args: Prisma.rhDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rhPayload>
          }
          update: {
            args: Prisma.rhUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rhPayload>
          }
          deleteMany: {
            args: Prisma.rhDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.rhUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.rhUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rhPayload>[]
          }
          upsert: {
            args: Prisma.rhUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rhPayload>
          }
          aggregate: {
            args: Prisma.RhAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRh>
          }
          groupBy: {
            args: Prisma.rhGroupByArgs<ExtArgs>
            result: $Utils.Optional<RhGroupByOutputType>[]
          }
          count: {
            args: Prisma.rhCountArgs<ExtArgs>
            result: $Utils.Optional<RhCountAggregateOutputType> | number
          }
        }
      }
      types_conge: {
        payload: Prisma.$types_congePayload<ExtArgs>
        fields: Prisma.types_congeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.types_congeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_congePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.types_congeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_congePayload>
          }
          findFirst: {
            args: Prisma.types_congeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_congePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.types_congeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_congePayload>
          }
          findMany: {
            args: Prisma.types_congeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_congePayload>[]
          }
          create: {
            args: Prisma.types_congeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_congePayload>
          }
          createMany: {
            args: Prisma.types_congeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.types_congeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_congePayload>[]
          }
          delete: {
            args: Prisma.types_congeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_congePayload>
          }
          update: {
            args: Prisma.types_congeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_congePayload>
          }
          deleteMany: {
            args: Prisma.types_congeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.types_congeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.types_congeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_congePayload>[]
          }
          upsert: {
            args: Prisma.types_congeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_congePayload>
          }
          aggregate: {
            args: Prisma.Types_congeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTypes_conge>
          }
          groupBy: {
            args: Prisma.types_congeGroupByArgs<ExtArgs>
            result: $Utils.Optional<Types_congeGroupByOutputType>[]
          }
          count: {
            args: Prisma.types_congeCountArgs<ExtArgs>
            result: $Utils.Optional<Types_congeCountAggregateOutputType> | number
          }
        }
      }
      utilisateur: {
        payload: Prisma.$utilisateurPayload<ExtArgs>
        fields: Prisma.utilisateurFieldRefs
        operations: {
          findUnique: {
            args: Prisma.utilisateurFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$utilisateurPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.utilisateurFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$utilisateurPayload>
          }
          findFirst: {
            args: Prisma.utilisateurFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$utilisateurPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.utilisateurFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$utilisateurPayload>
          }
          findMany: {
            args: Prisma.utilisateurFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$utilisateurPayload>[]
          }
          create: {
            args: Prisma.utilisateurCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$utilisateurPayload>
          }
          createMany: {
            args: Prisma.utilisateurCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.utilisateurCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$utilisateurPayload>[]
          }
          delete: {
            args: Prisma.utilisateurDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$utilisateurPayload>
          }
          update: {
            args: Prisma.utilisateurUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$utilisateurPayload>
          }
          deleteMany: {
            args: Prisma.utilisateurDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.utilisateurUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.utilisateurUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$utilisateurPayload>[]
          }
          upsert: {
            args: Prisma.utilisateurUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$utilisateurPayload>
          }
          aggregate: {
            args: Prisma.UtilisateurAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUtilisateur>
          }
          groupBy: {
            args: Prisma.utilisateurGroupByArgs<ExtArgs>
            result: $Utils.Optional<UtilisateurGroupByOutputType>[]
          }
          count: {
            args: Prisma.utilisateurCountArgs<ExtArgs>
            result: $Utils.Optional<UtilisateurCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    demandes_conge?: demandes_congeOmit
    departement?: departementOmit
    employe?: employeOmit
    jours_feries?: jours_feriesOmit
    manager?: managerOmit
    notification?: notificationOmit
    rh?: rhOmit
    types_conge?: types_congeOmit
    utilisateur?: utilisateurOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DepartementCountOutputType
   */

  export type DepartementCountOutputType = {
    employe: number
    manager_manager_id_departementTodepartement: number
  }

  export type DepartementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employe?: boolean | DepartementCountOutputTypeCountEmployeArgs
    manager_manager_id_departementTodepartement?: boolean | DepartementCountOutputTypeCountManager_manager_id_departementTodepartementArgs
  }

  // Custom InputTypes
  /**
   * DepartementCountOutputType without action
   */
  export type DepartementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartementCountOutputType
     */
    select?: DepartementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DepartementCountOutputType without action
   */
  export type DepartementCountOutputTypeCountEmployeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: employeWhereInput
  }

  /**
   * DepartementCountOutputType without action
   */
  export type DepartementCountOutputTypeCountManager_manager_id_departementTodepartementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: managerWhereInput
  }


  /**
   * Count Type EmployeCountOutputType
   */

  export type EmployeCountOutputType = {
    demandes_conge: number
  }

  export type EmployeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demandes_conge?: boolean | EmployeCountOutputTypeCountDemandes_congeArgs
  }

  // Custom InputTypes
  /**
   * EmployeCountOutputType without action
   */
  export type EmployeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeCountOutputType
     */
    select?: EmployeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeCountOutputType without action
   */
  export type EmployeCountOutputTypeCountDemandes_congeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: demandes_congeWhereInput
  }


  /**
   * Count Type ManagerCountOutputType
   */

  export type ManagerCountOutputType = {
    departement_departement_id_managerTomanager: number
    types_conge: number
  }

  export type ManagerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departement_departement_id_managerTomanager?: boolean | ManagerCountOutputTypeCountDepartement_departement_id_managerTomanagerArgs
    types_conge?: boolean | ManagerCountOutputTypeCountTypes_congeArgs
  }

  // Custom InputTypes
  /**
   * ManagerCountOutputType without action
   */
  export type ManagerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManagerCountOutputType
     */
    select?: ManagerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ManagerCountOutputType without action
   */
  export type ManagerCountOutputTypeCountDepartement_departement_id_managerTomanagerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: departementWhereInput
  }

  /**
   * ManagerCountOutputType without action
   */
  export type ManagerCountOutputTypeCountTypes_congeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: types_congeWhereInput
  }


  /**
   * Count Type Types_congeCountOutputType
   */

  export type Types_congeCountOutputType = {
    demandes_conge: number
  }

  export type Types_congeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demandes_conge?: boolean | Types_congeCountOutputTypeCountDemandes_congeArgs
  }

  // Custom InputTypes
  /**
   * Types_congeCountOutputType without action
   */
  export type Types_congeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Types_congeCountOutputType
     */
    select?: Types_congeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Types_congeCountOutputType without action
   */
  export type Types_congeCountOutputTypeCountDemandes_congeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: demandes_congeWhereInput
  }


  /**
   * Count Type UtilisateurCountOutputType
   */

  export type UtilisateurCountOutputType = {
    notification: number
  }

  export type UtilisateurCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notification?: boolean | UtilisateurCountOutputTypeCountNotificationArgs
  }

  // Custom InputTypes
  /**
   * UtilisateurCountOutputType without action
   */
  export type UtilisateurCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurCountOutputType
     */
    select?: UtilisateurCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UtilisateurCountOutputType without action
   */
  export type UtilisateurCountOutputTypeCountNotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model demandes_conge
   */

  export type AggregateDemandes_conge = {
    _count: Demandes_congeCountAggregateOutputType | null
    _avg: Demandes_congeAvgAggregateOutputType | null
    _sum: Demandes_congeSumAggregateOutputType | null
    _min: Demandes_congeMinAggregateOutputType | null
    _max: Demandes_congeMaxAggregateOutputType | null
  }

  export type Demandes_congeAvgAggregateOutputType = {
    id_demande_conde: number | null
    id_employe: number | null
    id_type_conge: number | null
    nombre_jours: number | null
  }

  export type Demandes_congeSumAggregateOutputType = {
    id_demande_conde: number | null
    id_employe: number | null
    id_type_conge: number | null
    nombre_jours: number | null
  }

  export type Demandes_congeMinAggregateOutputType = {
    id_demande_conde: number | null
    id_employe: number | null
    id_type_conge: number | null
    motif: string | null
    statut_demandes_conge: string | null
    commentaire_manager: string | null
    commentaire_rh: string | null
    date_demande: Date | null
    date_debut: Date | null
    date_fin: Date | null
    nombre_jours: number | null
  }

  export type Demandes_congeMaxAggregateOutputType = {
    id_demande_conde: number | null
    id_employe: number | null
    id_type_conge: number | null
    motif: string | null
    statut_demandes_conge: string | null
    commentaire_manager: string | null
    commentaire_rh: string | null
    date_demande: Date | null
    date_debut: Date | null
    date_fin: Date | null
    nombre_jours: number | null
  }

  export type Demandes_congeCountAggregateOutputType = {
    id_demande_conde: number
    id_employe: number
    id_type_conge: number
    motif: number
    statut_demandes_conge: number
    commentaire_manager: number
    commentaire_rh: number
    date_demande: number
    date_debut: number
    date_fin: number
    nombre_jours: number
    _all: number
  }


  export type Demandes_congeAvgAggregateInputType = {
    id_demande_conde?: true
    id_employe?: true
    id_type_conge?: true
    nombre_jours?: true
  }

  export type Demandes_congeSumAggregateInputType = {
    id_demande_conde?: true
    id_employe?: true
    id_type_conge?: true
    nombre_jours?: true
  }

  export type Demandes_congeMinAggregateInputType = {
    id_demande_conde?: true
    id_employe?: true
    id_type_conge?: true
    motif?: true
    statut_demandes_conge?: true
    commentaire_manager?: true
    commentaire_rh?: true
    date_demande?: true
    date_debut?: true
    date_fin?: true
    nombre_jours?: true
  }

  export type Demandes_congeMaxAggregateInputType = {
    id_demande_conde?: true
    id_employe?: true
    id_type_conge?: true
    motif?: true
    statut_demandes_conge?: true
    commentaire_manager?: true
    commentaire_rh?: true
    date_demande?: true
    date_debut?: true
    date_fin?: true
    nombre_jours?: true
  }

  export type Demandes_congeCountAggregateInputType = {
    id_demande_conde?: true
    id_employe?: true
    id_type_conge?: true
    motif?: true
    statut_demandes_conge?: true
    commentaire_manager?: true
    commentaire_rh?: true
    date_demande?: true
    date_debut?: true
    date_fin?: true
    nombre_jours?: true
    _all?: true
  }

  export type Demandes_congeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which demandes_conge to aggregate.
     */
    where?: demandes_congeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of demandes_conges to fetch.
     */
    orderBy?: demandes_congeOrderByWithRelationInput | demandes_congeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: demandes_congeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` demandes_conges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` demandes_conges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned demandes_conges
    **/
    _count?: true | Demandes_congeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Demandes_congeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Demandes_congeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Demandes_congeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Demandes_congeMaxAggregateInputType
  }

  export type GetDemandes_congeAggregateType<T extends Demandes_congeAggregateArgs> = {
        [P in keyof T & keyof AggregateDemandes_conge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDemandes_conge[P]>
      : GetScalarType<T[P], AggregateDemandes_conge[P]>
  }




  export type demandes_congeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: demandes_congeWhereInput
    orderBy?: demandes_congeOrderByWithAggregationInput | demandes_congeOrderByWithAggregationInput[]
    by: Demandes_congeScalarFieldEnum[] | Demandes_congeScalarFieldEnum
    having?: demandes_congeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Demandes_congeCountAggregateInputType | true
    _avg?: Demandes_congeAvgAggregateInputType
    _sum?: Demandes_congeSumAggregateInputType
    _min?: Demandes_congeMinAggregateInputType
    _max?: Demandes_congeMaxAggregateInputType
  }

  export type Demandes_congeGroupByOutputType = {
    id_demande_conde: number
    id_employe: number
    id_type_conge: number
    motif: string | null
    statut_demandes_conge: string | null
    commentaire_manager: string | null
    commentaire_rh: string | null
    date_demande: Date | null
    date_debut: Date | null
    date_fin: Date | null
    nombre_jours: number | null
    _count: Demandes_congeCountAggregateOutputType | null
    _avg: Demandes_congeAvgAggregateOutputType | null
    _sum: Demandes_congeSumAggregateOutputType | null
    _min: Demandes_congeMinAggregateOutputType | null
    _max: Demandes_congeMaxAggregateOutputType | null
  }

  type GetDemandes_congeGroupByPayload<T extends demandes_congeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Demandes_congeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Demandes_congeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Demandes_congeGroupByOutputType[P]>
            : GetScalarType<T[P], Demandes_congeGroupByOutputType[P]>
        }
      >
    >


  export type demandes_congeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_demande_conde?: boolean
    id_employe?: boolean
    id_type_conge?: boolean
    motif?: boolean
    statut_demandes_conge?: boolean
    commentaire_manager?: boolean
    commentaire_rh?: boolean
    date_demande?: boolean
    date_debut?: boolean
    date_fin?: boolean
    nombre_jours?: boolean
    employe?: boolean | employeDefaultArgs<ExtArgs>
    types_conge?: boolean | types_congeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["demandes_conge"]>

  export type demandes_congeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_demande_conde?: boolean
    id_employe?: boolean
    id_type_conge?: boolean
    motif?: boolean
    statut_demandes_conge?: boolean
    commentaire_manager?: boolean
    commentaire_rh?: boolean
    date_demande?: boolean
    date_debut?: boolean
    date_fin?: boolean
    nombre_jours?: boolean
    employe?: boolean | employeDefaultArgs<ExtArgs>
    types_conge?: boolean | types_congeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["demandes_conge"]>

  export type demandes_congeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_demande_conde?: boolean
    id_employe?: boolean
    id_type_conge?: boolean
    motif?: boolean
    statut_demandes_conge?: boolean
    commentaire_manager?: boolean
    commentaire_rh?: boolean
    date_demande?: boolean
    date_debut?: boolean
    date_fin?: boolean
    nombre_jours?: boolean
    employe?: boolean | employeDefaultArgs<ExtArgs>
    types_conge?: boolean | types_congeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["demandes_conge"]>

  export type demandes_congeSelectScalar = {
    id_demande_conde?: boolean
    id_employe?: boolean
    id_type_conge?: boolean
    motif?: boolean
    statut_demandes_conge?: boolean
    commentaire_manager?: boolean
    commentaire_rh?: boolean
    date_demande?: boolean
    date_debut?: boolean
    date_fin?: boolean
    nombre_jours?: boolean
  }

  export type demandes_congeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_demande_conde" | "id_employe" | "id_type_conge" | "motif" | "statut_demandes_conge" | "commentaire_manager" | "commentaire_rh" | "date_demande" | "date_debut" | "date_fin" | "nombre_jours", ExtArgs["result"]["demandes_conge"]>
  export type demandes_congeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employe?: boolean | employeDefaultArgs<ExtArgs>
    types_conge?: boolean | types_congeDefaultArgs<ExtArgs>
  }
  export type demandes_congeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employe?: boolean | employeDefaultArgs<ExtArgs>
    types_conge?: boolean | types_congeDefaultArgs<ExtArgs>
  }
  export type demandes_congeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employe?: boolean | employeDefaultArgs<ExtArgs>
    types_conge?: boolean | types_congeDefaultArgs<ExtArgs>
  }

  export type $demandes_congePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "demandes_conge"
    objects: {
      employe: Prisma.$employePayload<ExtArgs>
      types_conge: Prisma.$types_congePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_demande_conde: number
      id_employe: number
      id_type_conge: number
      motif: string | null
      statut_demandes_conge: string | null
      commentaire_manager: string | null
      commentaire_rh: string | null
      date_demande: Date | null
      date_debut: Date | null
      date_fin: Date | null
      nombre_jours: number | null
    }, ExtArgs["result"]["demandes_conge"]>
    composites: {}
  }

  type demandes_congeGetPayload<S extends boolean | null | undefined | demandes_congeDefaultArgs> = $Result.GetResult<Prisma.$demandes_congePayload, S>

  type demandes_congeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<demandes_congeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Demandes_congeCountAggregateInputType | true
    }

  export interface demandes_congeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['demandes_conge'], meta: { name: 'demandes_conge' } }
    /**
     * Find zero or one Demandes_conge that matches the filter.
     * @param {demandes_congeFindUniqueArgs} args - Arguments to find a Demandes_conge
     * @example
     * // Get one Demandes_conge
     * const demandes_conge = await prisma.demandes_conge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends demandes_congeFindUniqueArgs>(args: SelectSubset<T, demandes_congeFindUniqueArgs<ExtArgs>>): Prisma__demandes_congeClient<$Result.GetResult<Prisma.$demandes_congePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Demandes_conge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {demandes_congeFindUniqueOrThrowArgs} args - Arguments to find a Demandes_conge
     * @example
     * // Get one Demandes_conge
     * const demandes_conge = await prisma.demandes_conge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends demandes_congeFindUniqueOrThrowArgs>(args: SelectSubset<T, demandes_congeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__demandes_congeClient<$Result.GetResult<Prisma.$demandes_congePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Demandes_conge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {demandes_congeFindFirstArgs} args - Arguments to find a Demandes_conge
     * @example
     * // Get one Demandes_conge
     * const demandes_conge = await prisma.demandes_conge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends demandes_congeFindFirstArgs>(args?: SelectSubset<T, demandes_congeFindFirstArgs<ExtArgs>>): Prisma__demandes_congeClient<$Result.GetResult<Prisma.$demandes_congePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Demandes_conge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {demandes_congeFindFirstOrThrowArgs} args - Arguments to find a Demandes_conge
     * @example
     * // Get one Demandes_conge
     * const demandes_conge = await prisma.demandes_conge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends demandes_congeFindFirstOrThrowArgs>(args?: SelectSubset<T, demandes_congeFindFirstOrThrowArgs<ExtArgs>>): Prisma__demandes_congeClient<$Result.GetResult<Prisma.$demandes_congePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Demandes_conges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {demandes_congeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Demandes_conges
     * const demandes_conges = await prisma.demandes_conge.findMany()
     * 
     * // Get first 10 Demandes_conges
     * const demandes_conges = await prisma.demandes_conge.findMany({ take: 10 })
     * 
     * // Only select the `id_demande_conde`
     * const demandes_congeWithId_demande_condeOnly = await prisma.demandes_conge.findMany({ select: { id_demande_conde: true } })
     * 
     */
    findMany<T extends demandes_congeFindManyArgs>(args?: SelectSubset<T, demandes_congeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$demandes_congePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Demandes_conge.
     * @param {demandes_congeCreateArgs} args - Arguments to create a Demandes_conge.
     * @example
     * // Create one Demandes_conge
     * const Demandes_conge = await prisma.demandes_conge.create({
     *   data: {
     *     // ... data to create a Demandes_conge
     *   }
     * })
     * 
     */
    create<T extends demandes_congeCreateArgs>(args: SelectSubset<T, demandes_congeCreateArgs<ExtArgs>>): Prisma__demandes_congeClient<$Result.GetResult<Prisma.$demandes_congePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Demandes_conges.
     * @param {demandes_congeCreateManyArgs} args - Arguments to create many Demandes_conges.
     * @example
     * // Create many Demandes_conges
     * const demandes_conge = await prisma.demandes_conge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends demandes_congeCreateManyArgs>(args?: SelectSubset<T, demandes_congeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Demandes_conges and returns the data saved in the database.
     * @param {demandes_congeCreateManyAndReturnArgs} args - Arguments to create many Demandes_conges.
     * @example
     * // Create many Demandes_conges
     * const demandes_conge = await prisma.demandes_conge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Demandes_conges and only return the `id_demande_conde`
     * const demandes_congeWithId_demande_condeOnly = await prisma.demandes_conge.createManyAndReturn({
     *   select: { id_demande_conde: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends demandes_congeCreateManyAndReturnArgs>(args?: SelectSubset<T, demandes_congeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$demandes_congePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Demandes_conge.
     * @param {demandes_congeDeleteArgs} args - Arguments to delete one Demandes_conge.
     * @example
     * // Delete one Demandes_conge
     * const Demandes_conge = await prisma.demandes_conge.delete({
     *   where: {
     *     // ... filter to delete one Demandes_conge
     *   }
     * })
     * 
     */
    delete<T extends demandes_congeDeleteArgs>(args: SelectSubset<T, demandes_congeDeleteArgs<ExtArgs>>): Prisma__demandes_congeClient<$Result.GetResult<Prisma.$demandes_congePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Demandes_conge.
     * @param {demandes_congeUpdateArgs} args - Arguments to update one Demandes_conge.
     * @example
     * // Update one Demandes_conge
     * const demandes_conge = await prisma.demandes_conge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends demandes_congeUpdateArgs>(args: SelectSubset<T, demandes_congeUpdateArgs<ExtArgs>>): Prisma__demandes_congeClient<$Result.GetResult<Prisma.$demandes_congePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Demandes_conges.
     * @param {demandes_congeDeleteManyArgs} args - Arguments to filter Demandes_conges to delete.
     * @example
     * // Delete a few Demandes_conges
     * const { count } = await prisma.demandes_conge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends demandes_congeDeleteManyArgs>(args?: SelectSubset<T, demandes_congeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Demandes_conges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {demandes_congeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Demandes_conges
     * const demandes_conge = await prisma.demandes_conge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends demandes_congeUpdateManyArgs>(args: SelectSubset<T, demandes_congeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Demandes_conges and returns the data updated in the database.
     * @param {demandes_congeUpdateManyAndReturnArgs} args - Arguments to update many Demandes_conges.
     * @example
     * // Update many Demandes_conges
     * const demandes_conge = await prisma.demandes_conge.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Demandes_conges and only return the `id_demande_conde`
     * const demandes_congeWithId_demande_condeOnly = await prisma.demandes_conge.updateManyAndReturn({
     *   select: { id_demande_conde: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends demandes_congeUpdateManyAndReturnArgs>(args: SelectSubset<T, demandes_congeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$demandes_congePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Demandes_conge.
     * @param {demandes_congeUpsertArgs} args - Arguments to update or create a Demandes_conge.
     * @example
     * // Update or create a Demandes_conge
     * const demandes_conge = await prisma.demandes_conge.upsert({
     *   create: {
     *     // ... data to create a Demandes_conge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Demandes_conge we want to update
     *   }
     * })
     */
    upsert<T extends demandes_congeUpsertArgs>(args: SelectSubset<T, demandes_congeUpsertArgs<ExtArgs>>): Prisma__demandes_congeClient<$Result.GetResult<Prisma.$demandes_congePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Demandes_conges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {demandes_congeCountArgs} args - Arguments to filter Demandes_conges to count.
     * @example
     * // Count the number of Demandes_conges
     * const count = await prisma.demandes_conge.count({
     *   where: {
     *     // ... the filter for the Demandes_conges we want to count
     *   }
     * })
    **/
    count<T extends demandes_congeCountArgs>(
      args?: Subset<T, demandes_congeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Demandes_congeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Demandes_conge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Demandes_congeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Demandes_congeAggregateArgs>(args: Subset<T, Demandes_congeAggregateArgs>): Prisma.PrismaPromise<GetDemandes_congeAggregateType<T>>

    /**
     * Group by Demandes_conge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {demandes_congeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends demandes_congeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: demandes_congeGroupByArgs['orderBy'] }
        : { orderBy?: demandes_congeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, demandes_congeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDemandes_congeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the demandes_conge model
   */
  readonly fields: demandes_congeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for demandes_conge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__demandes_congeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employe<T extends employeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, employeDefaultArgs<ExtArgs>>): Prisma__employeClient<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    types_conge<T extends types_congeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, types_congeDefaultArgs<ExtArgs>>): Prisma__types_congeClient<$Result.GetResult<Prisma.$types_congePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the demandes_conge model
   */
  interface demandes_congeFieldRefs {
    readonly id_demande_conde: FieldRef<"demandes_conge", 'Int'>
    readonly id_employe: FieldRef<"demandes_conge", 'Int'>
    readonly id_type_conge: FieldRef<"demandes_conge", 'Int'>
    readonly motif: FieldRef<"demandes_conge", 'String'>
    readonly statut_demandes_conge: FieldRef<"demandes_conge", 'String'>
    readonly commentaire_manager: FieldRef<"demandes_conge", 'String'>
    readonly commentaire_rh: FieldRef<"demandes_conge", 'String'>
    readonly date_demande: FieldRef<"demandes_conge", 'DateTime'>
    readonly date_debut: FieldRef<"demandes_conge", 'DateTime'>
    readonly date_fin: FieldRef<"demandes_conge", 'DateTime'>
    readonly nombre_jours: FieldRef<"demandes_conge", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * demandes_conge findUnique
   */
  export type demandes_congeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeInclude<ExtArgs> | null
    /**
     * Filter, which demandes_conge to fetch.
     */
    where: demandes_congeWhereUniqueInput
  }

  /**
   * demandes_conge findUniqueOrThrow
   */
  export type demandes_congeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeInclude<ExtArgs> | null
    /**
     * Filter, which demandes_conge to fetch.
     */
    where: demandes_congeWhereUniqueInput
  }

  /**
   * demandes_conge findFirst
   */
  export type demandes_congeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeInclude<ExtArgs> | null
    /**
     * Filter, which demandes_conge to fetch.
     */
    where?: demandes_congeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of demandes_conges to fetch.
     */
    orderBy?: demandes_congeOrderByWithRelationInput | demandes_congeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for demandes_conges.
     */
    cursor?: demandes_congeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` demandes_conges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` demandes_conges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of demandes_conges.
     */
    distinct?: Demandes_congeScalarFieldEnum | Demandes_congeScalarFieldEnum[]
  }

  /**
   * demandes_conge findFirstOrThrow
   */
  export type demandes_congeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeInclude<ExtArgs> | null
    /**
     * Filter, which demandes_conge to fetch.
     */
    where?: demandes_congeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of demandes_conges to fetch.
     */
    orderBy?: demandes_congeOrderByWithRelationInput | demandes_congeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for demandes_conges.
     */
    cursor?: demandes_congeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` demandes_conges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` demandes_conges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of demandes_conges.
     */
    distinct?: Demandes_congeScalarFieldEnum | Demandes_congeScalarFieldEnum[]
  }

  /**
   * demandes_conge findMany
   */
  export type demandes_congeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeInclude<ExtArgs> | null
    /**
     * Filter, which demandes_conges to fetch.
     */
    where?: demandes_congeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of demandes_conges to fetch.
     */
    orderBy?: demandes_congeOrderByWithRelationInput | demandes_congeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing demandes_conges.
     */
    cursor?: demandes_congeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` demandes_conges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` demandes_conges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of demandes_conges.
     */
    distinct?: Demandes_congeScalarFieldEnum | Demandes_congeScalarFieldEnum[]
  }

  /**
   * demandes_conge create
   */
  export type demandes_congeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeInclude<ExtArgs> | null
    /**
     * The data needed to create a demandes_conge.
     */
    data: XOR<demandes_congeCreateInput, demandes_congeUncheckedCreateInput>
  }

  /**
   * demandes_conge createMany
   */
  export type demandes_congeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many demandes_conges.
     */
    data: demandes_congeCreateManyInput | demandes_congeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * demandes_conge createManyAndReturn
   */
  export type demandes_congeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * The data used to create many demandes_conges.
     */
    data: demandes_congeCreateManyInput | demandes_congeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * demandes_conge update
   */
  export type demandes_congeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeInclude<ExtArgs> | null
    /**
     * The data needed to update a demandes_conge.
     */
    data: XOR<demandes_congeUpdateInput, demandes_congeUncheckedUpdateInput>
    /**
     * Choose, which demandes_conge to update.
     */
    where: demandes_congeWhereUniqueInput
  }

  /**
   * demandes_conge updateMany
   */
  export type demandes_congeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update demandes_conges.
     */
    data: XOR<demandes_congeUpdateManyMutationInput, demandes_congeUncheckedUpdateManyInput>
    /**
     * Filter which demandes_conges to update
     */
    where?: demandes_congeWhereInput
    /**
     * Limit how many demandes_conges to update.
     */
    limit?: number
  }

  /**
   * demandes_conge updateManyAndReturn
   */
  export type demandes_congeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * The data used to update demandes_conges.
     */
    data: XOR<demandes_congeUpdateManyMutationInput, demandes_congeUncheckedUpdateManyInput>
    /**
     * Filter which demandes_conges to update
     */
    where?: demandes_congeWhereInput
    /**
     * Limit how many demandes_conges to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * demandes_conge upsert
   */
  export type demandes_congeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeInclude<ExtArgs> | null
    /**
     * The filter to search for the demandes_conge to update in case it exists.
     */
    where: demandes_congeWhereUniqueInput
    /**
     * In case the demandes_conge found by the `where` argument doesn't exist, create a new demandes_conge with this data.
     */
    create: XOR<demandes_congeCreateInput, demandes_congeUncheckedCreateInput>
    /**
     * In case the demandes_conge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<demandes_congeUpdateInput, demandes_congeUncheckedUpdateInput>
  }

  /**
   * demandes_conge delete
   */
  export type demandes_congeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeInclude<ExtArgs> | null
    /**
     * Filter which demandes_conge to delete.
     */
    where: demandes_congeWhereUniqueInput
  }

  /**
   * demandes_conge deleteMany
   */
  export type demandes_congeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which demandes_conges to delete
     */
    where?: demandes_congeWhereInput
    /**
     * Limit how many demandes_conges to delete.
     */
    limit?: number
  }

  /**
   * demandes_conge without action
   */
  export type demandes_congeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeInclude<ExtArgs> | null
  }


  /**
   * Model departement
   */

  export type AggregateDepartement = {
    _count: DepartementCountAggregateOutputType | null
    _avg: DepartementAvgAggregateOutputType | null
    _sum: DepartementSumAggregateOutputType | null
    _min: DepartementMinAggregateOutputType | null
    _max: DepartementMaxAggregateOutputType | null
  }

  export type DepartementAvgAggregateOutputType = {
    id_departement: number | null
    id_manager: number | null
  }

  export type DepartementSumAggregateOutputType = {
    id_departement: number | null
    id_manager: number | null
  }

  export type DepartementMinAggregateOutputType = {
    id_departement: number | null
    nom_departement: string | null
    id_manager: number | null
  }

  export type DepartementMaxAggregateOutputType = {
    id_departement: number | null
    nom_departement: string | null
    id_manager: number | null
  }

  export type DepartementCountAggregateOutputType = {
    id_departement: number
    nom_departement: number
    id_manager: number
    _all: number
  }


  export type DepartementAvgAggregateInputType = {
    id_departement?: true
    id_manager?: true
  }

  export type DepartementSumAggregateInputType = {
    id_departement?: true
    id_manager?: true
  }

  export type DepartementMinAggregateInputType = {
    id_departement?: true
    nom_departement?: true
    id_manager?: true
  }

  export type DepartementMaxAggregateInputType = {
    id_departement?: true
    nom_departement?: true
    id_manager?: true
  }

  export type DepartementCountAggregateInputType = {
    id_departement?: true
    nom_departement?: true
    id_manager?: true
    _all?: true
  }

  export type DepartementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which departement to aggregate.
     */
    where?: departementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departements to fetch.
     */
    orderBy?: departementOrderByWithRelationInput | departementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: departementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned departements
    **/
    _count?: true | DepartementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DepartementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DepartementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartementMaxAggregateInputType
  }

  export type GetDepartementAggregateType<T extends DepartementAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartement[P]>
      : GetScalarType<T[P], AggregateDepartement[P]>
  }




  export type departementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: departementWhereInput
    orderBy?: departementOrderByWithAggregationInput | departementOrderByWithAggregationInput[]
    by: DepartementScalarFieldEnum[] | DepartementScalarFieldEnum
    having?: departementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartementCountAggregateInputType | true
    _avg?: DepartementAvgAggregateInputType
    _sum?: DepartementSumAggregateInputType
    _min?: DepartementMinAggregateInputType
    _max?: DepartementMaxAggregateInputType
  }

  export type DepartementGroupByOutputType = {
    id_departement: number
    nom_departement: string
    id_manager: number | null
    _count: DepartementCountAggregateOutputType | null
    _avg: DepartementAvgAggregateOutputType | null
    _sum: DepartementSumAggregateOutputType | null
    _min: DepartementMinAggregateOutputType | null
    _max: DepartementMaxAggregateOutputType | null
  }

  type GetDepartementGroupByPayload<T extends departementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartementGroupByOutputType[P]>
            : GetScalarType<T[P], DepartementGroupByOutputType[P]>
        }
      >
    >


  export type departementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_departement?: boolean
    nom_departement?: boolean
    id_manager?: boolean
    manager_departement_id_managerTomanager?: boolean | departement$manager_departement_id_managerTomanagerArgs<ExtArgs>
    employe?: boolean | departement$employeArgs<ExtArgs>
    manager_manager_id_departementTodepartement?: boolean | departement$manager_manager_id_departementTodepartementArgs<ExtArgs>
    _count?: boolean | DepartementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["departement"]>

  export type departementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_departement?: boolean
    nom_departement?: boolean
    id_manager?: boolean
    manager_departement_id_managerTomanager?: boolean | departement$manager_departement_id_managerTomanagerArgs<ExtArgs>
  }, ExtArgs["result"]["departement"]>

  export type departementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_departement?: boolean
    nom_departement?: boolean
    id_manager?: boolean
    manager_departement_id_managerTomanager?: boolean | departement$manager_departement_id_managerTomanagerArgs<ExtArgs>
  }, ExtArgs["result"]["departement"]>

  export type departementSelectScalar = {
    id_departement?: boolean
    nom_departement?: boolean
    id_manager?: boolean
  }

  export type departementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_departement" | "nom_departement" | "id_manager", ExtArgs["result"]["departement"]>
  export type departementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager_departement_id_managerTomanager?: boolean | departement$manager_departement_id_managerTomanagerArgs<ExtArgs>
    employe?: boolean | departement$employeArgs<ExtArgs>
    manager_manager_id_departementTodepartement?: boolean | departement$manager_manager_id_departementTodepartementArgs<ExtArgs>
    _count?: boolean | DepartementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type departementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager_departement_id_managerTomanager?: boolean | departement$manager_departement_id_managerTomanagerArgs<ExtArgs>
  }
  export type departementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager_departement_id_managerTomanager?: boolean | departement$manager_departement_id_managerTomanagerArgs<ExtArgs>
  }

  export type $departementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "departement"
    objects: {
      manager_departement_id_managerTomanager: Prisma.$managerPayload<ExtArgs> | null
      employe: Prisma.$employePayload<ExtArgs>[]
      manager_manager_id_departementTodepartement: Prisma.$managerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_departement: number
      nom_departement: string
      id_manager: number | null
    }, ExtArgs["result"]["departement"]>
    composites: {}
  }

  type departementGetPayload<S extends boolean | null | undefined | departementDefaultArgs> = $Result.GetResult<Prisma.$departementPayload, S>

  type departementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<departementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DepartementCountAggregateInputType | true
    }

  export interface departementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['departement'], meta: { name: 'departement' } }
    /**
     * Find zero or one Departement that matches the filter.
     * @param {departementFindUniqueArgs} args - Arguments to find a Departement
     * @example
     * // Get one Departement
     * const departement = await prisma.departement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends departementFindUniqueArgs>(args: SelectSubset<T, departementFindUniqueArgs<ExtArgs>>): Prisma__departementClient<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Departement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {departementFindUniqueOrThrowArgs} args - Arguments to find a Departement
     * @example
     * // Get one Departement
     * const departement = await prisma.departement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends departementFindUniqueOrThrowArgs>(args: SelectSubset<T, departementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__departementClient<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Departement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departementFindFirstArgs} args - Arguments to find a Departement
     * @example
     * // Get one Departement
     * const departement = await prisma.departement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends departementFindFirstArgs>(args?: SelectSubset<T, departementFindFirstArgs<ExtArgs>>): Prisma__departementClient<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Departement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departementFindFirstOrThrowArgs} args - Arguments to find a Departement
     * @example
     * // Get one Departement
     * const departement = await prisma.departement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends departementFindFirstOrThrowArgs>(args?: SelectSubset<T, departementFindFirstOrThrowArgs<ExtArgs>>): Prisma__departementClient<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Departements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departements
     * const departements = await prisma.departement.findMany()
     * 
     * // Get first 10 Departements
     * const departements = await prisma.departement.findMany({ take: 10 })
     * 
     * // Only select the `id_departement`
     * const departementWithId_departementOnly = await prisma.departement.findMany({ select: { id_departement: true } })
     * 
     */
    findMany<T extends departementFindManyArgs>(args?: SelectSubset<T, departementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Departement.
     * @param {departementCreateArgs} args - Arguments to create a Departement.
     * @example
     * // Create one Departement
     * const Departement = await prisma.departement.create({
     *   data: {
     *     // ... data to create a Departement
     *   }
     * })
     * 
     */
    create<T extends departementCreateArgs>(args: SelectSubset<T, departementCreateArgs<ExtArgs>>): Prisma__departementClient<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Departements.
     * @param {departementCreateManyArgs} args - Arguments to create many Departements.
     * @example
     * // Create many Departements
     * const departement = await prisma.departement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends departementCreateManyArgs>(args?: SelectSubset<T, departementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departements and returns the data saved in the database.
     * @param {departementCreateManyAndReturnArgs} args - Arguments to create many Departements.
     * @example
     * // Create many Departements
     * const departement = await prisma.departement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departements and only return the `id_departement`
     * const departementWithId_departementOnly = await prisma.departement.createManyAndReturn({
     *   select: { id_departement: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends departementCreateManyAndReturnArgs>(args?: SelectSubset<T, departementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Departement.
     * @param {departementDeleteArgs} args - Arguments to delete one Departement.
     * @example
     * // Delete one Departement
     * const Departement = await prisma.departement.delete({
     *   where: {
     *     // ... filter to delete one Departement
     *   }
     * })
     * 
     */
    delete<T extends departementDeleteArgs>(args: SelectSubset<T, departementDeleteArgs<ExtArgs>>): Prisma__departementClient<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Departement.
     * @param {departementUpdateArgs} args - Arguments to update one Departement.
     * @example
     * // Update one Departement
     * const departement = await prisma.departement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends departementUpdateArgs>(args: SelectSubset<T, departementUpdateArgs<ExtArgs>>): Prisma__departementClient<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Departements.
     * @param {departementDeleteManyArgs} args - Arguments to filter Departements to delete.
     * @example
     * // Delete a few Departements
     * const { count } = await prisma.departement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends departementDeleteManyArgs>(args?: SelectSubset<T, departementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departements
     * const departement = await prisma.departement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends departementUpdateManyArgs>(args: SelectSubset<T, departementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departements and returns the data updated in the database.
     * @param {departementUpdateManyAndReturnArgs} args - Arguments to update many Departements.
     * @example
     * // Update many Departements
     * const departement = await prisma.departement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Departements and only return the `id_departement`
     * const departementWithId_departementOnly = await prisma.departement.updateManyAndReturn({
     *   select: { id_departement: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends departementUpdateManyAndReturnArgs>(args: SelectSubset<T, departementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Departement.
     * @param {departementUpsertArgs} args - Arguments to update or create a Departement.
     * @example
     * // Update or create a Departement
     * const departement = await prisma.departement.upsert({
     *   create: {
     *     // ... data to create a Departement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Departement we want to update
     *   }
     * })
     */
    upsert<T extends departementUpsertArgs>(args: SelectSubset<T, departementUpsertArgs<ExtArgs>>): Prisma__departementClient<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Departements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departementCountArgs} args - Arguments to filter Departements to count.
     * @example
     * // Count the number of Departements
     * const count = await prisma.departement.count({
     *   where: {
     *     // ... the filter for the Departements we want to count
     *   }
     * })
    **/
    count<T extends departementCountArgs>(
      args?: Subset<T, departementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Departement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DepartementAggregateArgs>(args: Subset<T, DepartementAggregateArgs>): Prisma.PrismaPromise<GetDepartementAggregateType<T>>

    /**
     * Group by Departement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends departementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: departementGroupByArgs['orderBy'] }
        : { orderBy?: departementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, departementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the departement model
   */
  readonly fields: departementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for departement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__departementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    manager_departement_id_managerTomanager<T extends departement$manager_departement_id_managerTomanagerArgs<ExtArgs> = {}>(args?: Subset<T, departement$manager_departement_id_managerTomanagerArgs<ExtArgs>>): Prisma__managerClient<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    employe<T extends departement$employeArgs<ExtArgs> = {}>(args?: Subset<T, departement$employeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    manager_manager_id_departementTodepartement<T extends departement$manager_manager_id_departementTodepartementArgs<ExtArgs> = {}>(args?: Subset<T, departement$manager_manager_id_departementTodepartementArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the departement model
   */
  interface departementFieldRefs {
    readonly id_departement: FieldRef<"departement", 'Int'>
    readonly nom_departement: FieldRef<"departement", 'String'>
    readonly id_manager: FieldRef<"departement", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * departement findUnique
   */
  export type departementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementInclude<ExtArgs> | null
    /**
     * Filter, which departement to fetch.
     */
    where: departementWhereUniqueInput
  }

  /**
   * departement findUniqueOrThrow
   */
  export type departementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementInclude<ExtArgs> | null
    /**
     * Filter, which departement to fetch.
     */
    where: departementWhereUniqueInput
  }

  /**
   * departement findFirst
   */
  export type departementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementInclude<ExtArgs> | null
    /**
     * Filter, which departement to fetch.
     */
    where?: departementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departements to fetch.
     */
    orderBy?: departementOrderByWithRelationInput | departementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for departements.
     */
    cursor?: departementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of departements.
     */
    distinct?: DepartementScalarFieldEnum | DepartementScalarFieldEnum[]
  }

  /**
   * departement findFirstOrThrow
   */
  export type departementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementInclude<ExtArgs> | null
    /**
     * Filter, which departement to fetch.
     */
    where?: departementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departements to fetch.
     */
    orderBy?: departementOrderByWithRelationInput | departementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for departements.
     */
    cursor?: departementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of departements.
     */
    distinct?: DepartementScalarFieldEnum | DepartementScalarFieldEnum[]
  }

  /**
   * departement findMany
   */
  export type departementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementInclude<ExtArgs> | null
    /**
     * Filter, which departements to fetch.
     */
    where?: departementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departements to fetch.
     */
    orderBy?: departementOrderByWithRelationInput | departementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing departements.
     */
    cursor?: departementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of departements.
     */
    distinct?: DepartementScalarFieldEnum | DepartementScalarFieldEnum[]
  }

  /**
   * departement create
   */
  export type departementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementInclude<ExtArgs> | null
    /**
     * The data needed to create a departement.
     */
    data: XOR<departementCreateInput, departementUncheckedCreateInput>
  }

  /**
   * departement createMany
   */
  export type departementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many departements.
     */
    data: departementCreateManyInput | departementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * departement createManyAndReturn
   */
  export type departementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * The data used to create many departements.
     */
    data: departementCreateManyInput | departementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * departement update
   */
  export type departementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementInclude<ExtArgs> | null
    /**
     * The data needed to update a departement.
     */
    data: XOR<departementUpdateInput, departementUncheckedUpdateInput>
    /**
     * Choose, which departement to update.
     */
    where: departementWhereUniqueInput
  }

  /**
   * departement updateMany
   */
  export type departementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update departements.
     */
    data: XOR<departementUpdateManyMutationInput, departementUncheckedUpdateManyInput>
    /**
     * Filter which departements to update
     */
    where?: departementWhereInput
    /**
     * Limit how many departements to update.
     */
    limit?: number
  }

  /**
   * departement updateManyAndReturn
   */
  export type departementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * The data used to update departements.
     */
    data: XOR<departementUpdateManyMutationInput, departementUncheckedUpdateManyInput>
    /**
     * Filter which departements to update
     */
    where?: departementWhereInput
    /**
     * Limit how many departements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * departement upsert
   */
  export type departementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementInclude<ExtArgs> | null
    /**
     * The filter to search for the departement to update in case it exists.
     */
    where: departementWhereUniqueInput
    /**
     * In case the departement found by the `where` argument doesn't exist, create a new departement with this data.
     */
    create: XOR<departementCreateInput, departementUncheckedCreateInput>
    /**
     * In case the departement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<departementUpdateInput, departementUncheckedUpdateInput>
  }

  /**
   * departement delete
   */
  export type departementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementInclude<ExtArgs> | null
    /**
     * Filter which departement to delete.
     */
    where: departementWhereUniqueInput
  }

  /**
   * departement deleteMany
   */
  export type departementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which departements to delete
     */
    where?: departementWhereInput
    /**
     * Limit how many departements to delete.
     */
    limit?: number
  }

  /**
   * departement.manager_departement_id_managerTomanager
   */
  export type departement$manager_departement_id_managerTomanagerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
    where?: managerWhereInput
  }

  /**
   * departement.employe
   */
  export type departement$employeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeInclude<ExtArgs> | null
    where?: employeWhereInput
    orderBy?: employeOrderByWithRelationInput | employeOrderByWithRelationInput[]
    cursor?: employeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeScalarFieldEnum | EmployeScalarFieldEnum[]
  }

  /**
   * departement.manager_manager_id_departementTodepartement
   */
  export type departement$manager_manager_id_departementTodepartementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
    where?: managerWhereInput
    orderBy?: managerOrderByWithRelationInput | managerOrderByWithRelationInput[]
    cursor?: managerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[]
  }

  /**
   * departement without action
   */
  export type departementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementInclude<ExtArgs> | null
  }


  /**
   * Model employe
   */

  export type AggregateEmploye = {
    _count: EmployeCountAggregateOutputType | null
    _avg: EmployeAvgAggregateOutputType | null
    _sum: EmployeSumAggregateOutputType | null
    _min: EmployeMinAggregateOutputType | null
    _max: EmployeMaxAggregateOutputType | null
  }

  export type EmployeAvgAggregateOutputType = {
    id_employe: number | null
    id_departement: number | null
    id_utilisateur: number | null
  }

  export type EmployeSumAggregateOutputType = {
    id_employe: number | null
    id_departement: number | null
    id_utilisateur: number | null
  }

  export type EmployeMinAggregateOutputType = {
    id_employe: number | null
    nom_employe: string | null
    prenom_employe: string | null
    telephone_employe: string | null
    adresse_employe: string | null
    statut_employe: string | null
    id_departement: number | null
    id_utilisateur: number | null
  }

  export type EmployeMaxAggregateOutputType = {
    id_employe: number | null
    nom_employe: string | null
    prenom_employe: string | null
    telephone_employe: string | null
    adresse_employe: string | null
    statut_employe: string | null
    id_departement: number | null
    id_utilisateur: number | null
  }

  export type EmployeCountAggregateOutputType = {
    id_employe: number
    nom_employe: number
    prenom_employe: number
    telephone_employe: number
    adresse_employe: number
    statut_employe: number
    id_departement: number
    id_utilisateur: number
    _all: number
  }


  export type EmployeAvgAggregateInputType = {
    id_employe?: true
    id_departement?: true
    id_utilisateur?: true
  }

  export type EmployeSumAggregateInputType = {
    id_employe?: true
    id_departement?: true
    id_utilisateur?: true
  }

  export type EmployeMinAggregateInputType = {
    id_employe?: true
    nom_employe?: true
    prenom_employe?: true
    telephone_employe?: true
    adresse_employe?: true
    statut_employe?: true
    id_departement?: true
    id_utilisateur?: true
  }

  export type EmployeMaxAggregateInputType = {
    id_employe?: true
    nom_employe?: true
    prenom_employe?: true
    telephone_employe?: true
    adresse_employe?: true
    statut_employe?: true
    id_departement?: true
    id_utilisateur?: true
  }

  export type EmployeCountAggregateInputType = {
    id_employe?: true
    nom_employe?: true
    prenom_employe?: true
    telephone_employe?: true
    adresse_employe?: true
    statut_employe?: true
    id_departement?: true
    id_utilisateur?: true
    _all?: true
  }

  export type EmployeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which employe to aggregate.
     */
    where?: employeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employes to fetch.
     */
    orderBy?: employeOrderByWithRelationInput | employeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: employeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned employes
    **/
    _count?: true | EmployeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeMaxAggregateInputType
  }

  export type GetEmployeAggregateType<T extends EmployeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmploye]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmploye[P]>
      : GetScalarType<T[P], AggregateEmploye[P]>
  }




  export type employeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: employeWhereInput
    orderBy?: employeOrderByWithAggregationInput | employeOrderByWithAggregationInput[]
    by: EmployeScalarFieldEnum[] | EmployeScalarFieldEnum
    having?: employeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeCountAggregateInputType | true
    _avg?: EmployeAvgAggregateInputType
    _sum?: EmployeSumAggregateInputType
    _min?: EmployeMinAggregateInputType
    _max?: EmployeMaxAggregateInputType
  }

  export type EmployeGroupByOutputType = {
    id_employe: number
    nom_employe: string
    prenom_employe: string
    telephone_employe: string | null
    adresse_employe: string | null
    statut_employe: string | null
    id_departement: number | null
    id_utilisateur: number | null
    _count: EmployeCountAggregateOutputType | null
    _avg: EmployeAvgAggregateOutputType | null
    _sum: EmployeSumAggregateOutputType | null
    _min: EmployeMinAggregateOutputType | null
    _max: EmployeMaxAggregateOutputType | null
  }

  type GetEmployeGroupByPayload<T extends employeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeGroupByOutputType[P]>
        }
      >
    >


  export type employeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_employe?: boolean
    nom_employe?: boolean
    prenom_employe?: boolean
    telephone_employe?: boolean
    adresse_employe?: boolean
    statut_employe?: boolean
    id_departement?: boolean
    id_utilisateur?: boolean
    demandes_conge?: boolean | employe$demandes_congeArgs<ExtArgs>
    departement?: boolean | employe$departementArgs<ExtArgs>
    utilisateur?: boolean | employe$utilisateurArgs<ExtArgs>
    _count?: boolean | EmployeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employe"]>

  export type employeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_employe?: boolean
    nom_employe?: boolean
    prenom_employe?: boolean
    telephone_employe?: boolean
    adresse_employe?: boolean
    statut_employe?: boolean
    id_departement?: boolean
    id_utilisateur?: boolean
    departement?: boolean | employe$departementArgs<ExtArgs>
    utilisateur?: boolean | employe$utilisateurArgs<ExtArgs>
  }, ExtArgs["result"]["employe"]>

  export type employeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_employe?: boolean
    nom_employe?: boolean
    prenom_employe?: boolean
    telephone_employe?: boolean
    adresse_employe?: boolean
    statut_employe?: boolean
    id_departement?: boolean
    id_utilisateur?: boolean
    departement?: boolean | employe$departementArgs<ExtArgs>
    utilisateur?: boolean | employe$utilisateurArgs<ExtArgs>
  }, ExtArgs["result"]["employe"]>

  export type employeSelectScalar = {
    id_employe?: boolean
    nom_employe?: boolean
    prenom_employe?: boolean
    telephone_employe?: boolean
    adresse_employe?: boolean
    statut_employe?: boolean
    id_departement?: boolean
    id_utilisateur?: boolean
  }

  export type employeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_employe" | "nom_employe" | "prenom_employe" | "telephone_employe" | "adresse_employe" | "statut_employe" | "id_departement" | "id_utilisateur", ExtArgs["result"]["employe"]>
  export type employeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demandes_conge?: boolean | employe$demandes_congeArgs<ExtArgs>
    departement?: boolean | employe$departementArgs<ExtArgs>
    utilisateur?: boolean | employe$utilisateurArgs<ExtArgs>
    _count?: boolean | EmployeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type employeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departement?: boolean | employe$departementArgs<ExtArgs>
    utilisateur?: boolean | employe$utilisateurArgs<ExtArgs>
  }
  export type employeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departement?: boolean | employe$departementArgs<ExtArgs>
    utilisateur?: boolean | employe$utilisateurArgs<ExtArgs>
  }

  export type $employePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "employe"
    objects: {
      demandes_conge: Prisma.$demandes_congePayload<ExtArgs>[]
      departement: Prisma.$departementPayload<ExtArgs> | null
      utilisateur: Prisma.$utilisateurPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id_employe: number
      nom_employe: string
      prenom_employe: string
      telephone_employe: string | null
      adresse_employe: string | null
      statut_employe: string | null
      id_departement: number | null
      id_utilisateur: number | null
    }, ExtArgs["result"]["employe"]>
    composites: {}
  }

  type employeGetPayload<S extends boolean | null | undefined | employeDefaultArgs> = $Result.GetResult<Prisma.$employePayload, S>

  type employeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<employeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeCountAggregateInputType | true
    }

  export interface employeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['employe'], meta: { name: 'employe' } }
    /**
     * Find zero or one Employe that matches the filter.
     * @param {employeFindUniqueArgs} args - Arguments to find a Employe
     * @example
     * // Get one Employe
     * const employe = await prisma.employe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends employeFindUniqueArgs>(args: SelectSubset<T, employeFindUniqueArgs<ExtArgs>>): Prisma__employeClient<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employe that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {employeFindUniqueOrThrowArgs} args - Arguments to find a Employe
     * @example
     * // Get one Employe
     * const employe = await prisma.employe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends employeFindUniqueOrThrowArgs>(args: SelectSubset<T, employeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__employeClient<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeFindFirstArgs} args - Arguments to find a Employe
     * @example
     * // Get one Employe
     * const employe = await prisma.employe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends employeFindFirstArgs>(args?: SelectSubset<T, employeFindFirstArgs<ExtArgs>>): Prisma__employeClient<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeFindFirstOrThrowArgs} args - Arguments to find a Employe
     * @example
     * // Get one Employe
     * const employe = await prisma.employe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends employeFindFirstOrThrowArgs>(args?: SelectSubset<T, employeFindFirstOrThrowArgs<ExtArgs>>): Prisma__employeClient<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employes
     * const employes = await prisma.employe.findMany()
     * 
     * // Get first 10 Employes
     * const employes = await prisma.employe.findMany({ take: 10 })
     * 
     * // Only select the `id_employe`
     * const employeWithId_employeOnly = await prisma.employe.findMany({ select: { id_employe: true } })
     * 
     */
    findMany<T extends employeFindManyArgs>(args?: SelectSubset<T, employeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employe.
     * @param {employeCreateArgs} args - Arguments to create a Employe.
     * @example
     * // Create one Employe
     * const Employe = await prisma.employe.create({
     *   data: {
     *     // ... data to create a Employe
     *   }
     * })
     * 
     */
    create<T extends employeCreateArgs>(args: SelectSubset<T, employeCreateArgs<ExtArgs>>): Prisma__employeClient<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employes.
     * @param {employeCreateManyArgs} args - Arguments to create many Employes.
     * @example
     * // Create many Employes
     * const employe = await prisma.employe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends employeCreateManyArgs>(args?: SelectSubset<T, employeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employes and returns the data saved in the database.
     * @param {employeCreateManyAndReturnArgs} args - Arguments to create many Employes.
     * @example
     * // Create many Employes
     * const employe = await prisma.employe.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employes and only return the `id_employe`
     * const employeWithId_employeOnly = await prisma.employe.createManyAndReturn({
     *   select: { id_employe: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends employeCreateManyAndReturnArgs>(args?: SelectSubset<T, employeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employe.
     * @param {employeDeleteArgs} args - Arguments to delete one Employe.
     * @example
     * // Delete one Employe
     * const Employe = await prisma.employe.delete({
     *   where: {
     *     // ... filter to delete one Employe
     *   }
     * })
     * 
     */
    delete<T extends employeDeleteArgs>(args: SelectSubset<T, employeDeleteArgs<ExtArgs>>): Prisma__employeClient<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employe.
     * @param {employeUpdateArgs} args - Arguments to update one Employe.
     * @example
     * // Update one Employe
     * const employe = await prisma.employe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends employeUpdateArgs>(args: SelectSubset<T, employeUpdateArgs<ExtArgs>>): Prisma__employeClient<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employes.
     * @param {employeDeleteManyArgs} args - Arguments to filter Employes to delete.
     * @example
     * // Delete a few Employes
     * const { count } = await prisma.employe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends employeDeleteManyArgs>(args?: SelectSubset<T, employeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employes
     * const employe = await prisma.employe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends employeUpdateManyArgs>(args: SelectSubset<T, employeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employes and returns the data updated in the database.
     * @param {employeUpdateManyAndReturnArgs} args - Arguments to update many Employes.
     * @example
     * // Update many Employes
     * const employe = await prisma.employe.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employes and only return the `id_employe`
     * const employeWithId_employeOnly = await prisma.employe.updateManyAndReturn({
     *   select: { id_employe: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends employeUpdateManyAndReturnArgs>(args: SelectSubset<T, employeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employe.
     * @param {employeUpsertArgs} args - Arguments to update or create a Employe.
     * @example
     * // Update or create a Employe
     * const employe = await prisma.employe.upsert({
     *   create: {
     *     // ... data to create a Employe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employe we want to update
     *   }
     * })
     */
    upsert<T extends employeUpsertArgs>(args: SelectSubset<T, employeUpsertArgs<ExtArgs>>): Prisma__employeClient<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeCountArgs} args - Arguments to filter Employes to count.
     * @example
     * // Count the number of Employes
     * const count = await prisma.employe.count({
     *   where: {
     *     // ... the filter for the Employes we want to count
     *   }
     * })
    **/
    count<T extends employeCountArgs>(
      args?: Subset<T, employeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeAggregateArgs>(args: Subset<T, EmployeAggregateArgs>): Prisma.PrismaPromise<GetEmployeAggregateType<T>>

    /**
     * Group by Employe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends employeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: employeGroupByArgs['orderBy'] }
        : { orderBy?: employeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, employeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the employe model
   */
  readonly fields: employeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for employe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__employeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    demandes_conge<T extends employe$demandes_congeArgs<ExtArgs> = {}>(args?: Subset<T, employe$demandes_congeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$demandes_congePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    departement<T extends employe$departementArgs<ExtArgs> = {}>(args?: Subset<T, employe$departementArgs<ExtArgs>>): Prisma__departementClient<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    utilisateur<T extends employe$utilisateurArgs<ExtArgs> = {}>(args?: Subset<T, employe$utilisateurArgs<ExtArgs>>): Prisma__utilisateurClient<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the employe model
   */
  interface employeFieldRefs {
    readonly id_employe: FieldRef<"employe", 'Int'>
    readonly nom_employe: FieldRef<"employe", 'String'>
    readonly prenom_employe: FieldRef<"employe", 'String'>
    readonly telephone_employe: FieldRef<"employe", 'String'>
    readonly adresse_employe: FieldRef<"employe", 'String'>
    readonly statut_employe: FieldRef<"employe", 'String'>
    readonly id_departement: FieldRef<"employe", 'Int'>
    readonly id_utilisateur: FieldRef<"employe", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * employe findUnique
   */
  export type employeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeInclude<ExtArgs> | null
    /**
     * Filter, which employe to fetch.
     */
    where: employeWhereUniqueInput
  }

  /**
   * employe findUniqueOrThrow
   */
  export type employeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeInclude<ExtArgs> | null
    /**
     * Filter, which employe to fetch.
     */
    where: employeWhereUniqueInput
  }

  /**
   * employe findFirst
   */
  export type employeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeInclude<ExtArgs> | null
    /**
     * Filter, which employe to fetch.
     */
    where?: employeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employes to fetch.
     */
    orderBy?: employeOrderByWithRelationInput | employeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employes.
     */
    cursor?: employeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employes.
     */
    distinct?: EmployeScalarFieldEnum | EmployeScalarFieldEnum[]
  }

  /**
   * employe findFirstOrThrow
   */
  export type employeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeInclude<ExtArgs> | null
    /**
     * Filter, which employe to fetch.
     */
    where?: employeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employes to fetch.
     */
    orderBy?: employeOrderByWithRelationInput | employeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employes.
     */
    cursor?: employeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employes.
     */
    distinct?: EmployeScalarFieldEnum | EmployeScalarFieldEnum[]
  }

  /**
   * employe findMany
   */
  export type employeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeInclude<ExtArgs> | null
    /**
     * Filter, which employes to fetch.
     */
    where?: employeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employes to fetch.
     */
    orderBy?: employeOrderByWithRelationInput | employeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing employes.
     */
    cursor?: employeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employes.
     */
    distinct?: EmployeScalarFieldEnum | EmployeScalarFieldEnum[]
  }

  /**
   * employe create
   */
  export type employeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeInclude<ExtArgs> | null
    /**
     * The data needed to create a employe.
     */
    data: XOR<employeCreateInput, employeUncheckedCreateInput>
  }

  /**
   * employe createMany
   */
  export type employeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many employes.
     */
    data: employeCreateManyInput | employeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * employe createManyAndReturn
   */
  export type employeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * The data used to create many employes.
     */
    data: employeCreateManyInput | employeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * employe update
   */
  export type employeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeInclude<ExtArgs> | null
    /**
     * The data needed to update a employe.
     */
    data: XOR<employeUpdateInput, employeUncheckedUpdateInput>
    /**
     * Choose, which employe to update.
     */
    where: employeWhereUniqueInput
  }

  /**
   * employe updateMany
   */
  export type employeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update employes.
     */
    data: XOR<employeUpdateManyMutationInput, employeUncheckedUpdateManyInput>
    /**
     * Filter which employes to update
     */
    where?: employeWhereInput
    /**
     * Limit how many employes to update.
     */
    limit?: number
  }

  /**
   * employe updateManyAndReturn
   */
  export type employeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * The data used to update employes.
     */
    data: XOR<employeUpdateManyMutationInput, employeUncheckedUpdateManyInput>
    /**
     * Filter which employes to update
     */
    where?: employeWhereInput
    /**
     * Limit how many employes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * employe upsert
   */
  export type employeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeInclude<ExtArgs> | null
    /**
     * The filter to search for the employe to update in case it exists.
     */
    where: employeWhereUniqueInput
    /**
     * In case the employe found by the `where` argument doesn't exist, create a new employe with this data.
     */
    create: XOR<employeCreateInput, employeUncheckedCreateInput>
    /**
     * In case the employe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<employeUpdateInput, employeUncheckedUpdateInput>
  }

  /**
   * employe delete
   */
  export type employeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeInclude<ExtArgs> | null
    /**
     * Filter which employe to delete.
     */
    where: employeWhereUniqueInput
  }

  /**
   * employe deleteMany
   */
  export type employeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which employes to delete
     */
    where?: employeWhereInput
    /**
     * Limit how many employes to delete.
     */
    limit?: number
  }

  /**
   * employe.demandes_conge
   */
  export type employe$demandes_congeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeInclude<ExtArgs> | null
    where?: demandes_congeWhereInput
    orderBy?: demandes_congeOrderByWithRelationInput | demandes_congeOrderByWithRelationInput[]
    cursor?: demandes_congeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Demandes_congeScalarFieldEnum | Demandes_congeScalarFieldEnum[]
  }

  /**
   * employe.departement
   */
  export type employe$departementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementInclude<ExtArgs> | null
    where?: departementWhereInput
  }

  /**
   * employe.utilisateur
   */
  export type employe$utilisateurArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: utilisateurInclude<ExtArgs> | null
    where?: utilisateurWhereInput
  }

  /**
   * employe without action
   */
  export type employeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeInclude<ExtArgs> | null
  }


  /**
   * Model jours_feries
   */

  export type AggregateJours_feries = {
    _count: Jours_feriesCountAggregateOutputType | null
    _avg: Jours_feriesAvgAggregateOutputType | null
    _sum: Jours_feriesSumAggregateOutputType | null
    _min: Jours_feriesMinAggregateOutputType | null
    _max: Jours_feriesMaxAggregateOutputType | null
  }

  export type Jours_feriesAvgAggregateOutputType = {
    id_jours_feries: number | null
  }

  export type Jours_feriesSumAggregateOutputType = {
    id_jours_feries: number | null
  }

  export type Jours_feriesMinAggregateOutputType = {
    id_jours_feries: number | null
    nom_jours_feries: string | null
    date_jours_feries: Date | null
  }

  export type Jours_feriesMaxAggregateOutputType = {
    id_jours_feries: number | null
    nom_jours_feries: string | null
    date_jours_feries: Date | null
  }

  export type Jours_feriesCountAggregateOutputType = {
    id_jours_feries: number
    nom_jours_feries: number
    date_jours_feries: number
    _all: number
  }


  export type Jours_feriesAvgAggregateInputType = {
    id_jours_feries?: true
  }

  export type Jours_feriesSumAggregateInputType = {
    id_jours_feries?: true
  }

  export type Jours_feriesMinAggregateInputType = {
    id_jours_feries?: true
    nom_jours_feries?: true
    date_jours_feries?: true
  }

  export type Jours_feriesMaxAggregateInputType = {
    id_jours_feries?: true
    nom_jours_feries?: true
    date_jours_feries?: true
  }

  export type Jours_feriesCountAggregateInputType = {
    id_jours_feries?: true
    nom_jours_feries?: true
    date_jours_feries?: true
    _all?: true
  }

  export type Jours_feriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which jours_feries to aggregate.
     */
    where?: jours_feriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of jours_feries to fetch.
     */
    orderBy?: jours_feriesOrderByWithRelationInput | jours_feriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: jours_feriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` jours_feries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` jours_feries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned jours_feries
    **/
    _count?: true | Jours_feriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Jours_feriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Jours_feriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Jours_feriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Jours_feriesMaxAggregateInputType
  }

  export type GetJours_feriesAggregateType<T extends Jours_feriesAggregateArgs> = {
        [P in keyof T & keyof AggregateJours_feries]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJours_feries[P]>
      : GetScalarType<T[P], AggregateJours_feries[P]>
  }




  export type jours_feriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: jours_feriesWhereInput
    orderBy?: jours_feriesOrderByWithAggregationInput | jours_feriesOrderByWithAggregationInput[]
    by: Jours_feriesScalarFieldEnum[] | Jours_feriesScalarFieldEnum
    having?: jours_feriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Jours_feriesCountAggregateInputType | true
    _avg?: Jours_feriesAvgAggregateInputType
    _sum?: Jours_feriesSumAggregateInputType
    _min?: Jours_feriesMinAggregateInputType
    _max?: Jours_feriesMaxAggregateInputType
  }

  export type Jours_feriesGroupByOutputType = {
    id_jours_feries: number
    nom_jours_feries: string
    date_jours_feries: Date
    _count: Jours_feriesCountAggregateOutputType | null
    _avg: Jours_feriesAvgAggregateOutputType | null
    _sum: Jours_feriesSumAggregateOutputType | null
    _min: Jours_feriesMinAggregateOutputType | null
    _max: Jours_feriesMaxAggregateOutputType | null
  }

  type GetJours_feriesGroupByPayload<T extends jours_feriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Jours_feriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Jours_feriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Jours_feriesGroupByOutputType[P]>
            : GetScalarType<T[P], Jours_feriesGroupByOutputType[P]>
        }
      >
    >


  export type jours_feriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_jours_feries?: boolean
    nom_jours_feries?: boolean
    date_jours_feries?: boolean
  }, ExtArgs["result"]["jours_feries"]>

  export type jours_feriesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_jours_feries?: boolean
    nom_jours_feries?: boolean
    date_jours_feries?: boolean
  }, ExtArgs["result"]["jours_feries"]>

  export type jours_feriesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_jours_feries?: boolean
    nom_jours_feries?: boolean
    date_jours_feries?: boolean
  }, ExtArgs["result"]["jours_feries"]>

  export type jours_feriesSelectScalar = {
    id_jours_feries?: boolean
    nom_jours_feries?: boolean
    date_jours_feries?: boolean
  }

  export type jours_feriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_jours_feries" | "nom_jours_feries" | "date_jours_feries", ExtArgs["result"]["jours_feries"]>

  export type $jours_feriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "jours_feries"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id_jours_feries: number
      nom_jours_feries: string
      date_jours_feries: Date
    }, ExtArgs["result"]["jours_feries"]>
    composites: {}
  }

  type jours_feriesGetPayload<S extends boolean | null | undefined | jours_feriesDefaultArgs> = $Result.GetResult<Prisma.$jours_feriesPayload, S>

  type jours_feriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<jours_feriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Jours_feriesCountAggregateInputType | true
    }

  export interface jours_feriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['jours_feries'], meta: { name: 'jours_feries' } }
    /**
     * Find zero or one Jours_feries that matches the filter.
     * @param {jours_feriesFindUniqueArgs} args - Arguments to find a Jours_feries
     * @example
     * // Get one Jours_feries
     * const jours_feries = await prisma.jours_feries.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends jours_feriesFindUniqueArgs>(args: SelectSubset<T, jours_feriesFindUniqueArgs<ExtArgs>>): Prisma__jours_feriesClient<$Result.GetResult<Prisma.$jours_feriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Jours_feries that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {jours_feriesFindUniqueOrThrowArgs} args - Arguments to find a Jours_feries
     * @example
     * // Get one Jours_feries
     * const jours_feries = await prisma.jours_feries.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends jours_feriesFindUniqueOrThrowArgs>(args: SelectSubset<T, jours_feriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__jours_feriesClient<$Result.GetResult<Prisma.$jours_feriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Jours_feries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jours_feriesFindFirstArgs} args - Arguments to find a Jours_feries
     * @example
     * // Get one Jours_feries
     * const jours_feries = await prisma.jours_feries.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends jours_feriesFindFirstArgs>(args?: SelectSubset<T, jours_feriesFindFirstArgs<ExtArgs>>): Prisma__jours_feriesClient<$Result.GetResult<Prisma.$jours_feriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Jours_feries that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jours_feriesFindFirstOrThrowArgs} args - Arguments to find a Jours_feries
     * @example
     * // Get one Jours_feries
     * const jours_feries = await prisma.jours_feries.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends jours_feriesFindFirstOrThrowArgs>(args?: SelectSubset<T, jours_feriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__jours_feriesClient<$Result.GetResult<Prisma.$jours_feriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jours_feries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jours_feriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jours_feries
     * const jours_feries = await prisma.jours_feries.findMany()
     * 
     * // Get first 10 Jours_feries
     * const jours_feries = await prisma.jours_feries.findMany({ take: 10 })
     * 
     * // Only select the `id_jours_feries`
     * const jours_feriesWithId_jours_feriesOnly = await prisma.jours_feries.findMany({ select: { id_jours_feries: true } })
     * 
     */
    findMany<T extends jours_feriesFindManyArgs>(args?: SelectSubset<T, jours_feriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$jours_feriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Jours_feries.
     * @param {jours_feriesCreateArgs} args - Arguments to create a Jours_feries.
     * @example
     * // Create one Jours_feries
     * const Jours_feries = await prisma.jours_feries.create({
     *   data: {
     *     // ... data to create a Jours_feries
     *   }
     * })
     * 
     */
    create<T extends jours_feriesCreateArgs>(args: SelectSubset<T, jours_feriesCreateArgs<ExtArgs>>): Prisma__jours_feriesClient<$Result.GetResult<Prisma.$jours_feriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jours_feries.
     * @param {jours_feriesCreateManyArgs} args - Arguments to create many Jours_feries.
     * @example
     * // Create many Jours_feries
     * const jours_feries = await prisma.jours_feries.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends jours_feriesCreateManyArgs>(args?: SelectSubset<T, jours_feriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jours_feries and returns the data saved in the database.
     * @param {jours_feriesCreateManyAndReturnArgs} args - Arguments to create many Jours_feries.
     * @example
     * // Create many Jours_feries
     * const jours_feries = await prisma.jours_feries.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jours_feries and only return the `id_jours_feries`
     * const jours_feriesWithId_jours_feriesOnly = await prisma.jours_feries.createManyAndReturn({
     *   select: { id_jours_feries: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends jours_feriesCreateManyAndReturnArgs>(args?: SelectSubset<T, jours_feriesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$jours_feriesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Jours_feries.
     * @param {jours_feriesDeleteArgs} args - Arguments to delete one Jours_feries.
     * @example
     * // Delete one Jours_feries
     * const Jours_feries = await prisma.jours_feries.delete({
     *   where: {
     *     // ... filter to delete one Jours_feries
     *   }
     * })
     * 
     */
    delete<T extends jours_feriesDeleteArgs>(args: SelectSubset<T, jours_feriesDeleteArgs<ExtArgs>>): Prisma__jours_feriesClient<$Result.GetResult<Prisma.$jours_feriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Jours_feries.
     * @param {jours_feriesUpdateArgs} args - Arguments to update one Jours_feries.
     * @example
     * // Update one Jours_feries
     * const jours_feries = await prisma.jours_feries.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends jours_feriesUpdateArgs>(args: SelectSubset<T, jours_feriesUpdateArgs<ExtArgs>>): Prisma__jours_feriesClient<$Result.GetResult<Prisma.$jours_feriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jours_feries.
     * @param {jours_feriesDeleteManyArgs} args - Arguments to filter Jours_feries to delete.
     * @example
     * // Delete a few Jours_feries
     * const { count } = await prisma.jours_feries.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends jours_feriesDeleteManyArgs>(args?: SelectSubset<T, jours_feriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jours_feries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jours_feriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jours_feries
     * const jours_feries = await prisma.jours_feries.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends jours_feriesUpdateManyArgs>(args: SelectSubset<T, jours_feriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jours_feries and returns the data updated in the database.
     * @param {jours_feriesUpdateManyAndReturnArgs} args - Arguments to update many Jours_feries.
     * @example
     * // Update many Jours_feries
     * const jours_feries = await prisma.jours_feries.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jours_feries and only return the `id_jours_feries`
     * const jours_feriesWithId_jours_feriesOnly = await prisma.jours_feries.updateManyAndReturn({
     *   select: { id_jours_feries: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends jours_feriesUpdateManyAndReturnArgs>(args: SelectSubset<T, jours_feriesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$jours_feriesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Jours_feries.
     * @param {jours_feriesUpsertArgs} args - Arguments to update or create a Jours_feries.
     * @example
     * // Update or create a Jours_feries
     * const jours_feries = await prisma.jours_feries.upsert({
     *   create: {
     *     // ... data to create a Jours_feries
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Jours_feries we want to update
     *   }
     * })
     */
    upsert<T extends jours_feriesUpsertArgs>(args: SelectSubset<T, jours_feriesUpsertArgs<ExtArgs>>): Prisma__jours_feriesClient<$Result.GetResult<Prisma.$jours_feriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jours_feries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jours_feriesCountArgs} args - Arguments to filter Jours_feries to count.
     * @example
     * // Count the number of Jours_feries
     * const count = await prisma.jours_feries.count({
     *   where: {
     *     // ... the filter for the Jours_feries we want to count
     *   }
     * })
    **/
    count<T extends jours_feriesCountArgs>(
      args?: Subset<T, jours_feriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Jours_feriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Jours_feries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Jours_feriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Jours_feriesAggregateArgs>(args: Subset<T, Jours_feriesAggregateArgs>): Prisma.PrismaPromise<GetJours_feriesAggregateType<T>>

    /**
     * Group by Jours_feries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jours_feriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends jours_feriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: jours_feriesGroupByArgs['orderBy'] }
        : { orderBy?: jours_feriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, jours_feriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJours_feriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the jours_feries model
   */
  readonly fields: jours_feriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for jours_feries.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__jours_feriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the jours_feries model
   */
  interface jours_feriesFieldRefs {
    readonly id_jours_feries: FieldRef<"jours_feries", 'Int'>
    readonly nom_jours_feries: FieldRef<"jours_feries", 'String'>
    readonly date_jours_feries: FieldRef<"jours_feries", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * jours_feries findUnique
   */
  export type jours_feriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jours_feries
     */
    select?: jours_feriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jours_feries
     */
    omit?: jours_feriesOmit<ExtArgs> | null
    /**
     * Filter, which jours_feries to fetch.
     */
    where: jours_feriesWhereUniqueInput
  }

  /**
   * jours_feries findUniqueOrThrow
   */
  export type jours_feriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jours_feries
     */
    select?: jours_feriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jours_feries
     */
    omit?: jours_feriesOmit<ExtArgs> | null
    /**
     * Filter, which jours_feries to fetch.
     */
    where: jours_feriesWhereUniqueInput
  }

  /**
   * jours_feries findFirst
   */
  export type jours_feriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jours_feries
     */
    select?: jours_feriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jours_feries
     */
    omit?: jours_feriesOmit<ExtArgs> | null
    /**
     * Filter, which jours_feries to fetch.
     */
    where?: jours_feriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of jours_feries to fetch.
     */
    orderBy?: jours_feriesOrderByWithRelationInput | jours_feriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for jours_feries.
     */
    cursor?: jours_feriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` jours_feries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` jours_feries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of jours_feries.
     */
    distinct?: Jours_feriesScalarFieldEnum | Jours_feriesScalarFieldEnum[]
  }

  /**
   * jours_feries findFirstOrThrow
   */
  export type jours_feriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jours_feries
     */
    select?: jours_feriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jours_feries
     */
    omit?: jours_feriesOmit<ExtArgs> | null
    /**
     * Filter, which jours_feries to fetch.
     */
    where?: jours_feriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of jours_feries to fetch.
     */
    orderBy?: jours_feriesOrderByWithRelationInput | jours_feriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for jours_feries.
     */
    cursor?: jours_feriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` jours_feries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` jours_feries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of jours_feries.
     */
    distinct?: Jours_feriesScalarFieldEnum | Jours_feriesScalarFieldEnum[]
  }

  /**
   * jours_feries findMany
   */
  export type jours_feriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jours_feries
     */
    select?: jours_feriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jours_feries
     */
    omit?: jours_feriesOmit<ExtArgs> | null
    /**
     * Filter, which jours_feries to fetch.
     */
    where?: jours_feriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of jours_feries to fetch.
     */
    orderBy?: jours_feriesOrderByWithRelationInput | jours_feriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing jours_feries.
     */
    cursor?: jours_feriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` jours_feries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` jours_feries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of jours_feries.
     */
    distinct?: Jours_feriesScalarFieldEnum | Jours_feriesScalarFieldEnum[]
  }

  /**
   * jours_feries create
   */
  export type jours_feriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jours_feries
     */
    select?: jours_feriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jours_feries
     */
    omit?: jours_feriesOmit<ExtArgs> | null
    /**
     * The data needed to create a jours_feries.
     */
    data: XOR<jours_feriesCreateInput, jours_feriesUncheckedCreateInput>
  }

  /**
   * jours_feries createMany
   */
  export type jours_feriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many jours_feries.
     */
    data: jours_feriesCreateManyInput | jours_feriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * jours_feries createManyAndReturn
   */
  export type jours_feriesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jours_feries
     */
    select?: jours_feriesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the jours_feries
     */
    omit?: jours_feriesOmit<ExtArgs> | null
    /**
     * The data used to create many jours_feries.
     */
    data: jours_feriesCreateManyInput | jours_feriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * jours_feries update
   */
  export type jours_feriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jours_feries
     */
    select?: jours_feriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jours_feries
     */
    omit?: jours_feriesOmit<ExtArgs> | null
    /**
     * The data needed to update a jours_feries.
     */
    data: XOR<jours_feriesUpdateInput, jours_feriesUncheckedUpdateInput>
    /**
     * Choose, which jours_feries to update.
     */
    where: jours_feriesWhereUniqueInput
  }

  /**
   * jours_feries updateMany
   */
  export type jours_feriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update jours_feries.
     */
    data: XOR<jours_feriesUpdateManyMutationInput, jours_feriesUncheckedUpdateManyInput>
    /**
     * Filter which jours_feries to update
     */
    where?: jours_feriesWhereInput
    /**
     * Limit how many jours_feries to update.
     */
    limit?: number
  }

  /**
   * jours_feries updateManyAndReturn
   */
  export type jours_feriesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jours_feries
     */
    select?: jours_feriesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the jours_feries
     */
    omit?: jours_feriesOmit<ExtArgs> | null
    /**
     * The data used to update jours_feries.
     */
    data: XOR<jours_feriesUpdateManyMutationInput, jours_feriesUncheckedUpdateManyInput>
    /**
     * Filter which jours_feries to update
     */
    where?: jours_feriesWhereInput
    /**
     * Limit how many jours_feries to update.
     */
    limit?: number
  }

  /**
   * jours_feries upsert
   */
  export type jours_feriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jours_feries
     */
    select?: jours_feriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jours_feries
     */
    omit?: jours_feriesOmit<ExtArgs> | null
    /**
     * The filter to search for the jours_feries to update in case it exists.
     */
    where: jours_feriesWhereUniqueInput
    /**
     * In case the jours_feries found by the `where` argument doesn't exist, create a new jours_feries with this data.
     */
    create: XOR<jours_feriesCreateInput, jours_feriesUncheckedCreateInput>
    /**
     * In case the jours_feries was found with the provided `where` argument, update it with this data.
     */
    update: XOR<jours_feriesUpdateInput, jours_feriesUncheckedUpdateInput>
  }

  /**
   * jours_feries delete
   */
  export type jours_feriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jours_feries
     */
    select?: jours_feriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jours_feries
     */
    omit?: jours_feriesOmit<ExtArgs> | null
    /**
     * Filter which jours_feries to delete.
     */
    where: jours_feriesWhereUniqueInput
  }

  /**
   * jours_feries deleteMany
   */
  export type jours_feriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which jours_feries to delete
     */
    where?: jours_feriesWhereInput
    /**
     * Limit how many jours_feries to delete.
     */
    limit?: number
  }

  /**
   * jours_feries without action
   */
  export type jours_feriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jours_feries
     */
    select?: jours_feriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jours_feries
     */
    omit?: jours_feriesOmit<ExtArgs> | null
  }


  /**
   * Model manager
   */

  export type AggregateManager = {
    _count: ManagerCountAggregateOutputType | null
    _avg: ManagerAvgAggregateOutputType | null
    _sum: ManagerSumAggregateOutputType | null
    _min: ManagerMinAggregateOutputType | null
    _max: ManagerMaxAggregateOutputType | null
  }

  export type ManagerAvgAggregateOutputType = {
    id_manager: number | null
    id_departement: number | null
    id_utilisateur: number | null
  }

  export type ManagerSumAggregateOutputType = {
    id_manager: number | null
    id_departement: number | null
    id_utilisateur: number | null
  }

  export type ManagerMinAggregateOutputType = {
    id_manager: number | null
    nom_manager: string | null
    prenom_manager: string | null
    telephone_manager: string | null
    adresse_manager: string | null
    statut_manager: string | null
    id_departement: number | null
    id_utilisateur: number | null
  }

  export type ManagerMaxAggregateOutputType = {
    id_manager: number | null
    nom_manager: string | null
    prenom_manager: string | null
    telephone_manager: string | null
    adresse_manager: string | null
    statut_manager: string | null
    id_departement: number | null
    id_utilisateur: number | null
  }

  export type ManagerCountAggregateOutputType = {
    id_manager: number
    nom_manager: number
    prenom_manager: number
    telephone_manager: number
    adresse_manager: number
    statut_manager: number
    id_departement: number
    id_utilisateur: number
    _all: number
  }


  export type ManagerAvgAggregateInputType = {
    id_manager?: true
    id_departement?: true
    id_utilisateur?: true
  }

  export type ManagerSumAggregateInputType = {
    id_manager?: true
    id_departement?: true
    id_utilisateur?: true
  }

  export type ManagerMinAggregateInputType = {
    id_manager?: true
    nom_manager?: true
    prenom_manager?: true
    telephone_manager?: true
    adresse_manager?: true
    statut_manager?: true
    id_departement?: true
    id_utilisateur?: true
  }

  export type ManagerMaxAggregateInputType = {
    id_manager?: true
    nom_manager?: true
    prenom_manager?: true
    telephone_manager?: true
    adresse_manager?: true
    statut_manager?: true
    id_departement?: true
    id_utilisateur?: true
  }

  export type ManagerCountAggregateInputType = {
    id_manager?: true
    nom_manager?: true
    prenom_manager?: true
    telephone_manager?: true
    adresse_manager?: true
    statut_manager?: true
    id_departement?: true
    id_utilisateur?: true
    _all?: true
  }

  export type ManagerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which manager to aggregate.
     */
    where?: managerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of managers to fetch.
     */
    orderBy?: managerOrderByWithRelationInput | managerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: managerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` managers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned managers
    **/
    _count?: true | ManagerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ManagerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ManagerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ManagerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ManagerMaxAggregateInputType
  }

  export type GetManagerAggregateType<T extends ManagerAggregateArgs> = {
        [P in keyof T & keyof AggregateManager]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateManager[P]>
      : GetScalarType<T[P], AggregateManager[P]>
  }




  export type managerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: managerWhereInput
    orderBy?: managerOrderByWithAggregationInput | managerOrderByWithAggregationInput[]
    by: ManagerScalarFieldEnum[] | ManagerScalarFieldEnum
    having?: managerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ManagerCountAggregateInputType | true
    _avg?: ManagerAvgAggregateInputType
    _sum?: ManagerSumAggregateInputType
    _min?: ManagerMinAggregateInputType
    _max?: ManagerMaxAggregateInputType
  }

  export type ManagerGroupByOutputType = {
    id_manager: number
    nom_manager: string
    prenom_manager: string
    telephone_manager: string | null
    adresse_manager: string | null
    statut_manager: string | null
    id_departement: number | null
    id_utilisateur: number | null
    _count: ManagerCountAggregateOutputType | null
    _avg: ManagerAvgAggregateOutputType | null
    _sum: ManagerSumAggregateOutputType | null
    _min: ManagerMinAggregateOutputType | null
    _max: ManagerMaxAggregateOutputType | null
  }

  type GetManagerGroupByPayload<T extends managerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ManagerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ManagerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ManagerGroupByOutputType[P]>
            : GetScalarType<T[P], ManagerGroupByOutputType[P]>
        }
      >
    >


  export type managerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_manager?: boolean
    nom_manager?: boolean
    prenom_manager?: boolean
    telephone_manager?: boolean
    adresse_manager?: boolean
    statut_manager?: boolean
    id_departement?: boolean
    id_utilisateur?: boolean
    departement_departement_id_managerTomanager?: boolean | manager$departement_departement_id_managerTomanagerArgs<ExtArgs>
    departement_manager_id_departementTodepartement?: boolean | manager$departement_manager_id_departementTodepartementArgs<ExtArgs>
    utilisateur?: boolean | manager$utilisateurArgs<ExtArgs>
    types_conge?: boolean | manager$types_congeArgs<ExtArgs>
    _count?: boolean | ManagerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["manager"]>

  export type managerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_manager?: boolean
    nom_manager?: boolean
    prenom_manager?: boolean
    telephone_manager?: boolean
    adresse_manager?: boolean
    statut_manager?: boolean
    id_departement?: boolean
    id_utilisateur?: boolean
    departement_manager_id_departementTodepartement?: boolean | manager$departement_manager_id_departementTodepartementArgs<ExtArgs>
    utilisateur?: boolean | manager$utilisateurArgs<ExtArgs>
  }, ExtArgs["result"]["manager"]>

  export type managerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_manager?: boolean
    nom_manager?: boolean
    prenom_manager?: boolean
    telephone_manager?: boolean
    adresse_manager?: boolean
    statut_manager?: boolean
    id_departement?: boolean
    id_utilisateur?: boolean
    departement_manager_id_departementTodepartement?: boolean | manager$departement_manager_id_departementTodepartementArgs<ExtArgs>
    utilisateur?: boolean | manager$utilisateurArgs<ExtArgs>
  }, ExtArgs["result"]["manager"]>

  export type managerSelectScalar = {
    id_manager?: boolean
    nom_manager?: boolean
    prenom_manager?: boolean
    telephone_manager?: boolean
    adresse_manager?: boolean
    statut_manager?: boolean
    id_departement?: boolean
    id_utilisateur?: boolean
  }

  export type managerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_manager" | "nom_manager" | "prenom_manager" | "telephone_manager" | "adresse_manager" | "statut_manager" | "id_departement" | "id_utilisateur", ExtArgs["result"]["manager"]>
  export type managerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departement_departement_id_managerTomanager?: boolean | manager$departement_departement_id_managerTomanagerArgs<ExtArgs>
    departement_manager_id_departementTodepartement?: boolean | manager$departement_manager_id_departementTodepartementArgs<ExtArgs>
    utilisateur?: boolean | manager$utilisateurArgs<ExtArgs>
    types_conge?: boolean | manager$types_congeArgs<ExtArgs>
    _count?: boolean | ManagerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type managerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departement_manager_id_departementTodepartement?: boolean | manager$departement_manager_id_departementTodepartementArgs<ExtArgs>
    utilisateur?: boolean | manager$utilisateurArgs<ExtArgs>
  }
  export type managerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departement_manager_id_departementTodepartement?: boolean | manager$departement_manager_id_departementTodepartementArgs<ExtArgs>
    utilisateur?: boolean | manager$utilisateurArgs<ExtArgs>
  }

  export type $managerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "manager"
    objects: {
      departement_departement_id_managerTomanager: Prisma.$departementPayload<ExtArgs>[]
      departement_manager_id_departementTodepartement: Prisma.$departementPayload<ExtArgs> | null
      utilisateur: Prisma.$utilisateurPayload<ExtArgs> | null
      types_conge: Prisma.$types_congePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_manager: number
      nom_manager: string
      prenom_manager: string
      telephone_manager: string | null
      adresse_manager: string | null
      statut_manager: string | null
      id_departement: number | null
      id_utilisateur: number | null
    }, ExtArgs["result"]["manager"]>
    composites: {}
  }

  type managerGetPayload<S extends boolean | null | undefined | managerDefaultArgs> = $Result.GetResult<Prisma.$managerPayload, S>

  type managerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<managerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ManagerCountAggregateInputType | true
    }

  export interface managerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['manager'], meta: { name: 'manager' } }
    /**
     * Find zero or one Manager that matches the filter.
     * @param {managerFindUniqueArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends managerFindUniqueArgs>(args: SelectSubset<T, managerFindUniqueArgs<ExtArgs>>): Prisma__managerClient<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Manager that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {managerFindUniqueOrThrowArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends managerFindUniqueOrThrowArgs>(args: SelectSubset<T, managerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__managerClient<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Manager that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {managerFindFirstArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends managerFindFirstArgs>(args?: SelectSubset<T, managerFindFirstArgs<ExtArgs>>): Prisma__managerClient<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Manager that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {managerFindFirstOrThrowArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends managerFindFirstOrThrowArgs>(args?: SelectSubset<T, managerFindFirstOrThrowArgs<ExtArgs>>): Prisma__managerClient<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Managers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {managerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Managers
     * const managers = await prisma.manager.findMany()
     * 
     * // Get first 10 Managers
     * const managers = await prisma.manager.findMany({ take: 10 })
     * 
     * // Only select the `id_manager`
     * const managerWithId_managerOnly = await prisma.manager.findMany({ select: { id_manager: true } })
     * 
     */
    findMany<T extends managerFindManyArgs>(args?: SelectSubset<T, managerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Manager.
     * @param {managerCreateArgs} args - Arguments to create a Manager.
     * @example
     * // Create one Manager
     * const Manager = await prisma.manager.create({
     *   data: {
     *     // ... data to create a Manager
     *   }
     * })
     * 
     */
    create<T extends managerCreateArgs>(args: SelectSubset<T, managerCreateArgs<ExtArgs>>): Prisma__managerClient<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Managers.
     * @param {managerCreateManyArgs} args - Arguments to create many Managers.
     * @example
     * // Create many Managers
     * const manager = await prisma.manager.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends managerCreateManyArgs>(args?: SelectSubset<T, managerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Managers and returns the data saved in the database.
     * @param {managerCreateManyAndReturnArgs} args - Arguments to create many Managers.
     * @example
     * // Create many Managers
     * const manager = await prisma.manager.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Managers and only return the `id_manager`
     * const managerWithId_managerOnly = await prisma.manager.createManyAndReturn({
     *   select: { id_manager: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends managerCreateManyAndReturnArgs>(args?: SelectSubset<T, managerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Manager.
     * @param {managerDeleteArgs} args - Arguments to delete one Manager.
     * @example
     * // Delete one Manager
     * const Manager = await prisma.manager.delete({
     *   where: {
     *     // ... filter to delete one Manager
     *   }
     * })
     * 
     */
    delete<T extends managerDeleteArgs>(args: SelectSubset<T, managerDeleteArgs<ExtArgs>>): Prisma__managerClient<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Manager.
     * @param {managerUpdateArgs} args - Arguments to update one Manager.
     * @example
     * // Update one Manager
     * const manager = await prisma.manager.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends managerUpdateArgs>(args: SelectSubset<T, managerUpdateArgs<ExtArgs>>): Prisma__managerClient<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Managers.
     * @param {managerDeleteManyArgs} args - Arguments to filter Managers to delete.
     * @example
     * // Delete a few Managers
     * const { count } = await prisma.manager.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends managerDeleteManyArgs>(args?: SelectSubset<T, managerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Managers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {managerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Managers
     * const manager = await prisma.manager.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends managerUpdateManyArgs>(args: SelectSubset<T, managerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Managers and returns the data updated in the database.
     * @param {managerUpdateManyAndReturnArgs} args - Arguments to update many Managers.
     * @example
     * // Update many Managers
     * const manager = await prisma.manager.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Managers and only return the `id_manager`
     * const managerWithId_managerOnly = await prisma.manager.updateManyAndReturn({
     *   select: { id_manager: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends managerUpdateManyAndReturnArgs>(args: SelectSubset<T, managerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Manager.
     * @param {managerUpsertArgs} args - Arguments to update or create a Manager.
     * @example
     * // Update or create a Manager
     * const manager = await prisma.manager.upsert({
     *   create: {
     *     // ... data to create a Manager
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Manager we want to update
     *   }
     * })
     */
    upsert<T extends managerUpsertArgs>(args: SelectSubset<T, managerUpsertArgs<ExtArgs>>): Prisma__managerClient<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Managers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {managerCountArgs} args - Arguments to filter Managers to count.
     * @example
     * // Count the number of Managers
     * const count = await prisma.manager.count({
     *   where: {
     *     // ... the filter for the Managers we want to count
     *   }
     * })
    **/
    count<T extends managerCountArgs>(
      args?: Subset<T, managerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ManagerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Manager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ManagerAggregateArgs>(args: Subset<T, ManagerAggregateArgs>): Prisma.PrismaPromise<GetManagerAggregateType<T>>

    /**
     * Group by Manager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {managerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends managerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: managerGroupByArgs['orderBy'] }
        : { orderBy?: managerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, managerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetManagerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the manager model
   */
  readonly fields: managerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for manager.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__managerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    departement_departement_id_managerTomanager<T extends manager$departement_departement_id_managerTomanagerArgs<ExtArgs> = {}>(args?: Subset<T, manager$departement_departement_id_managerTomanagerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    departement_manager_id_departementTodepartement<T extends manager$departement_manager_id_departementTodepartementArgs<ExtArgs> = {}>(args?: Subset<T, manager$departement_manager_id_departementTodepartementArgs<ExtArgs>>): Prisma__departementClient<$Result.GetResult<Prisma.$departementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    utilisateur<T extends manager$utilisateurArgs<ExtArgs> = {}>(args?: Subset<T, manager$utilisateurArgs<ExtArgs>>): Prisma__utilisateurClient<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    types_conge<T extends manager$types_congeArgs<ExtArgs> = {}>(args?: Subset<T, manager$types_congeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$types_congePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the manager model
   */
  interface managerFieldRefs {
    readonly id_manager: FieldRef<"manager", 'Int'>
    readonly nom_manager: FieldRef<"manager", 'String'>
    readonly prenom_manager: FieldRef<"manager", 'String'>
    readonly telephone_manager: FieldRef<"manager", 'String'>
    readonly adresse_manager: FieldRef<"manager", 'String'>
    readonly statut_manager: FieldRef<"manager", 'String'>
    readonly id_departement: FieldRef<"manager", 'Int'>
    readonly id_utilisateur: FieldRef<"manager", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * manager findUnique
   */
  export type managerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
    /**
     * Filter, which manager to fetch.
     */
    where: managerWhereUniqueInput
  }

  /**
   * manager findUniqueOrThrow
   */
  export type managerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
    /**
     * Filter, which manager to fetch.
     */
    where: managerWhereUniqueInput
  }

  /**
   * manager findFirst
   */
  export type managerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
    /**
     * Filter, which manager to fetch.
     */
    where?: managerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of managers to fetch.
     */
    orderBy?: managerOrderByWithRelationInput | managerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for managers.
     */
    cursor?: managerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` managers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of managers.
     */
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[]
  }

  /**
   * manager findFirstOrThrow
   */
  export type managerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
    /**
     * Filter, which manager to fetch.
     */
    where?: managerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of managers to fetch.
     */
    orderBy?: managerOrderByWithRelationInput | managerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for managers.
     */
    cursor?: managerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` managers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of managers.
     */
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[]
  }

  /**
   * manager findMany
   */
  export type managerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
    /**
     * Filter, which managers to fetch.
     */
    where?: managerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of managers to fetch.
     */
    orderBy?: managerOrderByWithRelationInput | managerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing managers.
     */
    cursor?: managerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` managers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of managers.
     */
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[]
  }

  /**
   * manager create
   */
  export type managerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
    /**
     * The data needed to create a manager.
     */
    data: XOR<managerCreateInput, managerUncheckedCreateInput>
  }

  /**
   * manager createMany
   */
  export type managerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many managers.
     */
    data: managerCreateManyInput | managerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * manager createManyAndReturn
   */
  export type managerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * The data used to create many managers.
     */
    data: managerCreateManyInput | managerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * manager update
   */
  export type managerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
    /**
     * The data needed to update a manager.
     */
    data: XOR<managerUpdateInput, managerUncheckedUpdateInput>
    /**
     * Choose, which manager to update.
     */
    where: managerWhereUniqueInput
  }

  /**
   * manager updateMany
   */
  export type managerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update managers.
     */
    data: XOR<managerUpdateManyMutationInput, managerUncheckedUpdateManyInput>
    /**
     * Filter which managers to update
     */
    where?: managerWhereInput
    /**
     * Limit how many managers to update.
     */
    limit?: number
  }

  /**
   * manager updateManyAndReturn
   */
  export type managerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * The data used to update managers.
     */
    data: XOR<managerUpdateManyMutationInput, managerUncheckedUpdateManyInput>
    /**
     * Filter which managers to update
     */
    where?: managerWhereInput
    /**
     * Limit how many managers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * manager upsert
   */
  export type managerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
    /**
     * The filter to search for the manager to update in case it exists.
     */
    where: managerWhereUniqueInput
    /**
     * In case the manager found by the `where` argument doesn't exist, create a new manager with this data.
     */
    create: XOR<managerCreateInput, managerUncheckedCreateInput>
    /**
     * In case the manager was found with the provided `where` argument, update it with this data.
     */
    update: XOR<managerUpdateInput, managerUncheckedUpdateInput>
  }

  /**
   * manager delete
   */
  export type managerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
    /**
     * Filter which manager to delete.
     */
    where: managerWhereUniqueInput
  }

  /**
   * manager deleteMany
   */
  export type managerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which managers to delete
     */
    where?: managerWhereInput
    /**
     * Limit how many managers to delete.
     */
    limit?: number
  }

  /**
   * manager.departement_departement_id_managerTomanager
   */
  export type manager$departement_departement_id_managerTomanagerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementInclude<ExtArgs> | null
    where?: departementWhereInput
    orderBy?: departementOrderByWithRelationInput | departementOrderByWithRelationInput[]
    cursor?: departementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DepartementScalarFieldEnum | DepartementScalarFieldEnum[]
  }

  /**
   * manager.departement_manager_id_departementTodepartement
   */
  export type manager$departement_manager_id_departementTodepartementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departement
     */
    select?: departementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departement
     */
    omit?: departementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departementInclude<ExtArgs> | null
    where?: departementWhereInput
  }

  /**
   * manager.utilisateur
   */
  export type manager$utilisateurArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: utilisateurInclude<ExtArgs> | null
    where?: utilisateurWhereInput
  }

  /**
   * manager.types_conge
   */
  export type manager$types_congeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_conge
     */
    select?: types_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_conge
     */
    omit?: types_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_congeInclude<ExtArgs> | null
    where?: types_congeWhereInput
    orderBy?: types_congeOrderByWithRelationInput | types_congeOrderByWithRelationInput[]
    cursor?: types_congeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Types_congeScalarFieldEnum | Types_congeScalarFieldEnum[]
  }

  /**
   * manager without action
   */
  export type managerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
  }


  /**
   * Model notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id_notification: number | null
    id_utilisateur: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id_notification: number | null
    id_utilisateur: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id_notification: number | null
    id_utilisateur: number | null
    message: string | null
    statut_notification: string | null
    date_envoie_notification: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id_notification: number | null
    id_utilisateur: number | null
    message: string | null
    statut_notification: string | null
    date_envoie_notification: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id_notification: number
    id_utilisateur: number
    message: number
    statut_notification: number
    date_envoie_notification: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id_notification?: true
    id_utilisateur?: true
  }

  export type NotificationSumAggregateInputType = {
    id_notification?: true
    id_utilisateur?: true
  }

  export type NotificationMinAggregateInputType = {
    id_notification?: true
    id_utilisateur?: true
    message?: true
    statut_notification?: true
    date_envoie_notification?: true
  }

  export type NotificationMaxAggregateInputType = {
    id_notification?: true
    id_utilisateur?: true
    message?: true
    statut_notification?: true
    date_envoie_notification?: true
  }

  export type NotificationCountAggregateInputType = {
    id_notification?: true
    id_utilisateur?: true
    message?: true
    statut_notification?: true
    date_envoie_notification?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notification to aggregate.
     */
    where?: notificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationOrderByWithRelationInput | notificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: notificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type notificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificationWhereInput
    orderBy?: notificationOrderByWithAggregationInput | notificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: notificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id_notification: number
    id_utilisateur: number
    message: string
    statut_notification: string | null
    date_envoie_notification: Date | null
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends notificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type notificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_notification?: boolean
    id_utilisateur?: boolean
    message?: boolean
    statut_notification?: boolean
    date_envoie_notification?: boolean
    utilisateur?: boolean | utilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type notificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_notification?: boolean
    id_utilisateur?: boolean
    message?: boolean
    statut_notification?: boolean
    date_envoie_notification?: boolean
    utilisateur?: boolean | utilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type notificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_notification?: boolean
    id_utilisateur?: boolean
    message?: boolean
    statut_notification?: boolean
    date_envoie_notification?: boolean
    utilisateur?: boolean | utilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type notificationSelectScalar = {
    id_notification?: boolean
    id_utilisateur?: boolean
    message?: boolean
    statut_notification?: boolean
    date_envoie_notification?: boolean
  }

  export type notificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_notification" | "id_utilisateur" | "message" | "statut_notification" | "date_envoie_notification", ExtArgs["result"]["notification"]>
  export type notificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | utilisateurDefaultArgs<ExtArgs>
  }
  export type notificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | utilisateurDefaultArgs<ExtArgs>
  }
  export type notificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | utilisateurDefaultArgs<ExtArgs>
  }

  export type $notificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "notification"
    objects: {
      utilisateur: Prisma.$utilisateurPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_notification: number
      id_utilisateur: number
      message: string
      statut_notification: string | null
      date_envoie_notification: Date | null
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type notificationGetPayload<S extends boolean | null | undefined | notificationDefaultArgs> = $Result.GetResult<Prisma.$notificationPayload, S>

  type notificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<notificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface notificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['notification'], meta: { name: 'notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {notificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends notificationFindUniqueArgs>(args: SelectSubset<T, notificationFindUniqueArgs<ExtArgs>>): Prisma__notificationClient<$Result.GetResult<Prisma.$notificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {notificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends notificationFindUniqueOrThrowArgs>(args: SelectSubset<T, notificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__notificationClient<$Result.GetResult<Prisma.$notificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends notificationFindFirstArgs>(args?: SelectSubset<T, notificationFindFirstArgs<ExtArgs>>): Prisma__notificationClient<$Result.GetResult<Prisma.$notificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends notificationFindFirstOrThrowArgs>(args?: SelectSubset<T, notificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__notificationClient<$Result.GetResult<Prisma.$notificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id_notification`
     * const notificationWithId_notificationOnly = await prisma.notification.findMany({ select: { id_notification: true } })
     * 
     */
    findMany<T extends notificationFindManyArgs>(args?: SelectSubset<T, notificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {notificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends notificationCreateArgs>(args: SelectSubset<T, notificationCreateArgs<ExtArgs>>): Prisma__notificationClient<$Result.GetResult<Prisma.$notificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {notificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends notificationCreateManyArgs>(args?: SelectSubset<T, notificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {notificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id_notification`
     * const notificationWithId_notificationOnly = await prisma.notification.createManyAndReturn({
     *   select: { id_notification: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends notificationCreateManyAndReturnArgs>(args?: SelectSubset<T, notificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {notificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends notificationDeleteArgs>(args: SelectSubset<T, notificationDeleteArgs<ExtArgs>>): Prisma__notificationClient<$Result.GetResult<Prisma.$notificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {notificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends notificationUpdateArgs>(args: SelectSubset<T, notificationUpdateArgs<ExtArgs>>): Prisma__notificationClient<$Result.GetResult<Prisma.$notificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {notificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends notificationDeleteManyArgs>(args?: SelectSubset<T, notificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends notificationUpdateManyArgs>(args: SelectSubset<T, notificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {notificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id_notification`
     * const notificationWithId_notificationOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id_notification: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends notificationUpdateManyAndReturnArgs>(args: SelectSubset<T, notificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {notificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends notificationUpsertArgs>(args: SelectSubset<T, notificationUpsertArgs<ExtArgs>>): Prisma__notificationClient<$Result.GetResult<Prisma.$notificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends notificationCountArgs>(
      args?: Subset<T, notificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends notificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: notificationGroupByArgs['orderBy'] }
        : { orderBy?: notificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, notificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the notification model
   */
  readonly fields: notificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__notificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    utilisateur<T extends utilisateurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, utilisateurDefaultArgs<ExtArgs>>): Prisma__utilisateurClient<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the notification model
   */
  interface notificationFieldRefs {
    readonly id_notification: FieldRef<"notification", 'Int'>
    readonly id_utilisateur: FieldRef<"notification", 'Int'>
    readonly message: FieldRef<"notification", 'String'>
    readonly statut_notification: FieldRef<"notification", 'String'>
    readonly date_envoie_notification: FieldRef<"notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * notification findUnique
   */
  export type notificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notification
     */
    select?: notificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notification
     */
    omit?: notificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationInclude<ExtArgs> | null
    /**
     * Filter, which notification to fetch.
     */
    where: notificationWhereUniqueInput
  }

  /**
   * notification findUniqueOrThrow
   */
  export type notificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notification
     */
    select?: notificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notification
     */
    omit?: notificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationInclude<ExtArgs> | null
    /**
     * Filter, which notification to fetch.
     */
    where: notificationWhereUniqueInput
  }

  /**
   * notification findFirst
   */
  export type notificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notification
     */
    select?: notificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notification
     */
    omit?: notificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationInclude<ExtArgs> | null
    /**
     * Filter, which notification to fetch.
     */
    where?: notificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationOrderByWithRelationInput | notificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notifications.
     */
    cursor?: notificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * notification findFirstOrThrow
   */
  export type notificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notification
     */
    select?: notificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notification
     */
    omit?: notificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationInclude<ExtArgs> | null
    /**
     * Filter, which notification to fetch.
     */
    where?: notificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationOrderByWithRelationInput | notificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notifications.
     */
    cursor?: notificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * notification findMany
   */
  export type notificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notification
     */
    select?: notificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notification
     */
    omit?: notificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where?: notificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationOrderByWithRelationInput | notificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing notifications.
     */
    cursor?: notificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * notification create
   */
  export type notificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notification
     */
    select?: notificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notification
     */
    omit?: notificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationInclude<ExtArgs> | null
    /**
     * The data needed to create a notification.
     */
    data: XOR<notificationCreateInput, notificationUncheckedCreateInput>
  }

  /**
   * notification createMany
   */
  export type notificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many notifications.
     */
    data: notificationCreateManyInput | notificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * notification createManyAndReturn
   */
  export type notificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notification
     */
    select?: notificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the notification
     */
    omit?: notificationOmit<ExtArgs> | null
    /**
     * The data used to create many notifications.
     */
    data: notificationCreateManyInput | notificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * notification update
   */
  export type notificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notification
     */
    select?: notificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notification
     */
    omit?: notificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationInclude<ExtArgs> | null
    /**
     * The data needed to update a notification.
     */
    data: XOR<notificationUpdateInput, notificationUncheckedUpdateInput>
    /**
     * Choose, which notification to update.
     */
    where: notificationWhereUniqueInput
  }

  /**
   * notification updateMany
   */
  export type notificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update notifications.
     */
    data: XOR<notificationUpdateManyMutationInput, notificationUncheckedUpdateManyInput>
    /**
     * Filter which notifications to update
     */
    where?: notificationWhereInput
    /**
     * Limit how many notifications to update.
     */
    limit?: number
  }

  /**
   * notification updateManyAndReturn
   */
  export type notificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notification
     */
    select?: notificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the notification
     */
    omit?: notificationOmit<ExtArgs> | null
    /**
     * The data used to update notifications.
     */
    data: XOR<notificationUpdateManyMutationInput, notificationUncheckedUpdateManyInput>
    /**
     * Filter which notifications to update
     */
    where?: notificationWhereInput
    /**
     * Limit how many notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * notification upsert
   */
  export type notificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notification
     */
    select?: notificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notification
     */
    omit?: notificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationInclude<ExtArgs> | null
    /**
     * The filter to search for the notification to update in case it exists.
     */
    where: notificationWhereUniqueInput
    /**
     * In case the notification found by the `where` argument doesn't exist, create a new notification with this data.
     */
    create: XOR<notificationCreateInput, notificationUncheckedCreateInput>
    /**
     * In case the notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<notificationUpdateInput, notificationUncheckedUpdateInput>
  }

  /**
   * notification delete
   */
  export type notificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notification
     */
    select?: notificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notification
     */
    omit?: notificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationInclude<ExtArgs> | null
    /**
     * Filter which notification to delete.
     */
    where: notificationWhereUniqueInput
  }

  /**
   * notification deleteMany
   */
  export type notificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notifications to delete
     */
    where?: notificationWhereInput
    /**
     * Limit how many notifications to delete.
     */
    limit?: number
  }

  /**
   * notification without action
   */
  export type notificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notification
     */
    select?: notificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notification
     */
    omit?: notificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationInclude<ExtArgs> | null
  }


  /**
   * Model rh
   */

  export type AggregateRh = {
    _count: RhCountAggregateOutputType | null
    _avg: RhAvgAggregateOutputType | null
    _sum: RhSumAggregateOutputType | null
    _min: RhMinAggregateOutputType | null
    _max: RhMaxAggregateOutputType | null
  }

  export type RhAvgAggregateOutputType = {
    id_rh: number | null
    id_utilisateur: number | null
  }

  export type RhSumAggregateOutputType = {
    id_rh: number | null
    id_utilisateur: number | null
  }

  export type RhMinAggregateOutputType = {
    id_rh: number | null
    nom_rh: string | null
    prenom_rh: string | null
    telephone_rh: string | null
    adresse_rh: string | null
    statut_rh: string | null
    id_utilisateur: number | null
  }

  export type RhMaxAggregateOutputType = {
    id_rh: number | null
    nom_rh: string | null
    prenom_rh: string | null
    telephone_rh: string | null
    adresse_rh: string | null
    statut_rh: string | null
    id_utilisateur: number | null
  }

  export type RhCountAggregateOutputType = {
    id_rh: number
    nom_rh: number
    prenom_rh: number
    telephone_rh: number
    adresse_rh: number
    statut_rh: number
    id_utilisateur: number
    _all: number
  }


  export type RhAvgAggregateInputType = {
    id_rh?: true
    id_utilisateur?: true
  }

  export type RhSumAggregateInputType = {
    id_rh?: true
    id_utilisateur?: true
  }

  export type RhMinAggregateInputType = {
    id_rh?: true
    nom_rh?: true
    prenom_rh?: true
    telephone_rh?: true
    adresse_rh?: true
    statut_rh?: true
    id_utilisateur?: true
  }

  export type RhMaxAggregateInputType = {
    id_rh?: true
    nom_rh?: true
    prenom_rh?: true
    telephone_rh?: true
    adresse_rh?: true
    statut_rh?: true
    id_utilisateur?: true
  }

  export type RhCountAggregateInputType = {
    id_rh?: true
    nom_rh?: true
    prenom_rh?: true
    telephone_rh?: true
    adresse_rh?: true
    statut_rh?: true
    id_utilisateur?: true
    _all?: true
  }

  export type RhAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rh to aggregate.
     */
    where?: rhWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rhs to fetch.
     */
    orderBy?: rhOrderByWithRelationInput | rhOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: rhWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rhs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rhs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned rhs
    **/
    _count?: true | RhCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RhAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RhSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RhMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RhMaxAggregateInputType
  }

  export type GetRhAggregateType<T extends RhAggregateArgs> = {
        [P in keyof T & keyof AggregateRh]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRh[P]>
      : GetScalarType<T[P], AggregateRh[P]>
  }




  export type rhGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: rhWhereInput
    orderBy?: rhOrderByWithAggregationInput | rhOrderByWithAggregationInput[]
    by: RhScalarFieldEnum[] | RhScalarFieldEnum
    having?: rhScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RhCountAggregateInputType | true
    _avg?: RhAvgAggregateInputType
    _sum?: RhSumAggregateInputType
    _min?: RhMinAggregateInputType
    _max?: RhMaxAggregateInputType
  }

  export type RhGroupByOutputType = {
    id_rh: number
    nom_rh: string
    prenom_rh: string
    telephone_rh: string | null
    adresse_rh: string | null
    statut_rh: string | null
    id_utilisateur: number | null
    _count: RhCountAggregateOutputType | null
    _avg: RhAvgAggregateOutputType | null
    _sum: RhSumAggregateOutputType | null
    _min: RhMinAggregateOutputType | null
    _max: RhMaxAggregateOutputType | null
  }

  type GetRhGroupByPayload<T extends rhGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RhGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RhGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RhGroupByOutputType[P]>
            : GetScalarType<T[P], RhGroupByOutputType[P]>
        }
      >
    >


  export type rhSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_rh?: boolean
    nom_rh?: boolean
    prenom_rh?: boolean
    telephone_rh?: boolean
    adresse_rh?: boolean
    statut_rh?: boolean
    id_utilisateur?: boolean
    utilisateur?: boolean | rh$utilisateurArgs<ExtArgs>
  }, ExtArgs["result"]["rh"]>

  export type rhSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_rh?: boolean
    nom_rh?: boolean
    prenom_rh?: boolean
    telephone_rh?: boolean
    adresse_rh?: boolean
    statut_rh?: boolean
    id_utilisateur?: boolean
    utilisateur?: boolean | rh$utilisateurArgs<ExtArgs>
  }, ExtArgs["result"]["rh"]>

  export type rhSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_rh?: boolean
    nom_rh?: boolean
    prenom_rh?: boolean
    telephone_rh?: boolean
    adresse_rh?: boolean
    statut_rh?: boolean
    id_utilisateur?: boolean
    utilisateur?: boolean | rh$utilisateurArgs<ExtArgs>
  }, ExtArgs["result"]["rh"]>

  export type rhSelectScalar = {
    id_rh?: boolean
    nom_rh?: boolean
    prenom_rh?: boolean
    telephone_rh?: boolean
    adresse_rh?: boolean
    statut_rh?: boolean
    id_utilisateur?: boolean
  }

  export type rhOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_rh" | "nom_rh" | "prenom_rh" | "telephone_rh" | "adresse_rh" | "statut_rh" | "id_utilisateur", ExtArgs["result"]["rh"]>
  export type rhInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | rh$utilisateurArgs<ExtArgs>
  }
  export type rhIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | rh$utilisateurArgs<ExtArgs>
  }
  export type rhIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | rh$utilisateurArgs<ExtArgs>
  }

  export type $rhPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "rh"
    objects: {
      utilisateur: Prisma.$utilisateurPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id_rh: number
      nom_rh: string
      prenom_rh: string
      telephone_rh: string | null
      adresse_rh: string | null
      statut_rh: string | null
      id_utilisateur: number | null
    }, ExtArgs["result"]["rh"]>
    composites: {}
  }

  type rhGetPayload<S extends boolean | null | undefined | rhDefaultArgs> = $Result.GetResult<Prisma.$rhPayload, S>

  type rhCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<rhFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RhCountAggregateInputType | true
    }

  export interface rhDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['rh'], meta: { name: 'rh' } }
    /**
     * Find zero or one Rh that matches the filter.
     * @param {rhFindUniqueArgs} args - Arguments to find a Rh
     * @example
     * // Get one Rh
     * const rh = await prisma.rh.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends rhFindUniqueArgs>(args: SelectSubset<T, rhFindUniqueArgs<ExtArgs>>): Prisma__rhClient<$Result.GetResult<Prisma.$rhPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rh that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {rhFindUniqueOrThrowArgs} args - Arguments to find a Rh
     * @example
     * // Get one Rh
     * const rh = await prisma.rh.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends rhFindUniqueOrThrowArgs>(args: SelectSubset<T, rhFindUniqueOrThrowArgs<ExtArgs>>): Prisma__rhClient<$Result.GetResult<Prisma.$rhPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rh that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rhFindFirstArgs} args - Arguments to find a Rh
     * @example
     * // Get one Rh
     * const rh = await prisma.rh.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends rhFindFirstArgs>(args?: SelectSubset<T, rhFindFirstArgs<ExtArgs>>): Prisma__rhClient<$Result.GetResult<Prisma.$rhPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rh that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rhFindFirstOrThrowArgs} args - Arguments to find a Rh
     * @example
     * // Get one Rh
     * const rh = await prisma.rh.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends rhFindFirstOrThrowArgs>(args?: SelectSubset<T, rhFindFirstOrThrowArgs<ExtArgs>>): Prisma__rhClient<$Result.GetResult<Prisma.$rhPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rhs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rhFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rhs
     * const rhs = await prisma.rh.findMany()
     * 
     * // Get first 10 Rhs
     * const rhs = await prisma.rh.findMany({ take: 10 })
     * 
     * // Only select the `id_rh`
     * const rhWithId_rhOnly = await prisma.rh.findMany({ select: { id_rh: true } })
     * 
     */
    findMany<T extends rhFindManyArgs>(args?: SelectSubset<T, rhFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rhPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rh.
     * @param {rhCreateArgs} args - Arguments to create a Rh.
     * @example
     * // Create one Rh
     * const Rh = await prisma.rh.create({
     *   data: {
     *     // ... data to create a Rh
     *   }
     * })
     * 
     */
    create<T extends rhCreateArgs>(args: SelectSubset<T, rhCreateArgs<ExtArgs>>): Prisma__rhClient<$Result.GetResult<Prisma.$rhPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rhs.
     * @param {rhCreateManyArgs} args - Arguments to create many Rhs.
     * @example
     * // Create many Rhs
     * const rh = await prisma.rh.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends rhCreateManyArgs>(args?: SelectSubset<T, rhCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rhs and returns the data saved in the database.
     * @param {rhCreateManyAndReturnArgs} args - Arguments to create many Rhs.
     * @example
     * // Create many Rhs
     * const rh = await prisma.rh.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rhs and only return the `id_rh`
     * const rhWithId_rhOnly = await prisma.rh.createManyAndReturn({
     *   select: { id_rh: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends rhCreateManyAndReturnArgs>(args?: SelectSubset<T, rhCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rhPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rh.
     * @param {rhDeleteArgs} args - Arguments to delete one Rh.
     * @example
     * // Delete one Rh
     * const Rh = await prisma.rh.delete({
     *   where: {
     *     // ... filter to delete one Rh
     *   }
     * })
     * 
     */
    delete<T extends rhDeleteArgs>(args: SelectSubset<T, rhDeleteArgs<ExtArgs>>): Prisma__rhClient<$Result.GetResult<Prisma.$rhPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rh.
     * @param {rhUpdateArgs} args - Arguments to update one Rh.
     * @example
     * // Update one Rh
     * const rh = await prisma.rh.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends rhUpdateArgs>(args: SelectSubset<T, rhUpdateArgs<ExtArgs>>): Prisma__rhClient<$Result.GetResult<Prisma.$rhPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rhs.
     * @param {rhDeleteManyArgs} args - Arguments to filter Rhs to delete.
     * @example
     * // Delete a few Rhs
     * const { count } = await prisma.rh.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends rhDeleteManyArgs>(args?: SelectSubset<T, rhDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rhs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rhUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rhs
     * const rh = await prisma.rh.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends rhUpdateManyArgs>(args: SelectSubset<T, rhUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rhs and returns the data updated in the database.
     * @param {rhUpdateManyAndReturnArgs} args - Arguments to update many Rhs.
     * @example
     * // Update many Rhs
     * const rh = await prisma.rh.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rhs and only return the `id_rh`
     * const rhWithId_rhOnly = await prisma.rh.updateManyAndReturn({
     *   select: { id_rh: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends rhUpdateManyAndReturnArgs>(args: SelectSubset<T, rhUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rhPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rh.
     * @param {rhUpsertArgs} args - Arguments to update or create a Rh.
     * @example
     * // Update or create a Rh
     * const rh = await prisma.rh.upsert({
     *   create: {
     *     // ... data to create a Rh
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rh we want to update
     *   }
     * })
     */
    upsert<T extends rhUpsertArgs>(args: SelectSubset<T, rhUpsertArgs<ExtArgs>>): Prisma__rhClient<$Result.GetResult<Prisma.$rhPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rhs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rhCountArgs} args - Arguments to filter Rhs to count.
     * @example
     * // Count the number of Rhs
     * const count = await prisma.rh.count({
     *   where: {
     *     // ... the filter for the Rhs we want to count
     *   }
     * })
    **/
    count<T extends rhCountArgs>(
      args?: Subset<T, rhCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RhCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rh.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RhAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RhAggregateArgs>(args: Subset<T, RhAggregateArgs>): Prisma.PrismaPromise<GetRhAggregateType<T>>

    /**
     * Group by Rh.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rhGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends rhGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: rhGroupByArgs['orderBy'] }
        : { orderBy?: rhGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, rhGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRhGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the rh model
   */
  readonly fields: rhFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for rh.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__rhClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    utilisateur<T extends rh$utilisateurArgs<ExtArgs> = {}>(args?: Subset<T, rh$utilisateurArgs<ExtArgs>>): Prisma__utilisateurClient<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the rh model
   */
  interface rhFieldRefs {
    readonly id_rh: FieldRef<"rh", 'Int'>
    readonly nom_rh: FieldRef<"rh", 'String'>
    readonly prenom_rh: FieldRef<"rh", 'String'>
    readonly telephone_rh: FieldRef<"rh", 'String'>
    readonly adresse_rh: FieldRef<"rh", 'String'>
    readonly statut_rh: FieldRef<"rh", 'String'>
    readonly id_utilisateur: FieldRef<"rh", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * rh findUnique
   */
  export type rhFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rh
     */
    select?: rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rh
     */
    omit?: rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rhInclude<ExtArgs> | null
    /**
     * Filter, which rh to fetch.
     */
    where: rhWhereUniqueInput
  }

  /**
   * rh findUniqueOrThrow
   */
  export type rhFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rh
     */
    select?: rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rh
     */
    omit?: rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rhInclude<ExtArgs> | null
    /**
     * Filter, which rh to fetch.
     */
    where: rhWhereUniqueInput
  }

  /**
   * rh findFirst
   */
  export type rhFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rh
     */
    select?: rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rh
     */
    omit?: rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rhInclude<ExtArgs> | null
    /**
     * Filter, which rh to fetch.
     */
    where?: rhWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rhs to fetch.
     */
    orderBy?: rhOrderByWithRelationInput | rhOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rhs.
     */
    cursor?: rhWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rhs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rhs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rhs.
     */
    distinct?: RhScalarFieldEnum | RhScalarFieldEnum[]
  }

  /**
   * rh findFirstOrThrow
   */
  export type rhFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rh
     */
    select?: rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rh
     */
    omit?: rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rhInclude<ExtArgs> | null
    /**
     * Filter, which rh to fetch.
     */
    where?: rhWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rhs to fetch.
     */
    orderBy?: rhOrderByWithRelationInput | rhOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rhs.
     */
    cursor?: rhWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rhs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rhs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rhs.
     */
    distinct?: RhScalarFieldEnum | RhScalarFieldEnum[]
  }

  /**
   * rh findMany
   */
  export type rhFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rh
     */
    select?: rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rh
     */
    omit?: rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rhInclude<ExtArgs> | null
    /**
     * Filter, which rhs to fetch.
     */
    where?: rhWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rhs to fetch.
     */
    orderBy?: rhOrderByWithRelationInput | rhOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing rhs.
     */
    cursor?: rhWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rhs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rhs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rhs.
     */
    distinct?: RhScalarFieldEnum | RhScalarFieldEnum[]
  }

  /**
   * rh create
   */
  export type rhCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rh
     */
    select?: rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rh
     */
    omit?: rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rhInclude<ExtArgs> | null
    /**
     * The data needed to create a rh.
     */
    data: XOR<rhCreateInput, rhUncheckedCreateInput>
  }

  /**
   * rh createMany
   */
  export type rhCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many rhs.
     */
    data: rhCreateManyInput | rhCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * rh createManyAndReturn
   */
  export type rhCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rh
     */
    select?: rhSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the rh
     */
    omit?: rhOmit<ExtArgs> | null
    /**
     * The data used to create many rhs.
     */
    data: rhCreateManyInput | rhCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rhIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * rh update
   */
  export type rhUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rh
     */
    select?: rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rh
     */
    omit?: rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rhInclude<ExtArgs> | null
    /**
     * The data needed to update a rh.
     */
    data: XOR<rhUpdateInput, rhUncheckedUpdateInput>
    /**
     * Choose, which rh to update.
     */
    where: rhWhereUniqueInput
  }

  /**
   * rh updateMany
   */
  export type rhUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update rhs.
     */
    data: XOR<rhUpdateManyMutationInput, rhUncheckedUpdateManyInput>
    /**
     * Filter which rhs to update
     */
    where?: rhWhereInput
    /**
     * Limit how many rhs to update.
     */
    limit?: number
  }

  /**
   * rh updateManyAndReturn
   */
  export type rhUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rh
     */
    select?: rhSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the rh
     */
    omit?: rhOmit<ExtArgs> | null
    /**
     * The data used to update rhs.
     */
    data: XOR<rhUpdateManyMutationInput, rhUncheckedUpdateManyInput>
    /**
     * Filter which rhs to update
     */
    where?: rhWhereInput
    /**
     * Limit how many rhs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rhIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * rh upsert
   */
  export type rhUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rh
     */
    select?: rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rh
     */
    omit?: rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rhInclude<ExtArgs> | null
    /**
     * The filter to search for the rh to update in case it exists.
     */
    where: rhWhereUniqueInput
    /**
     * In case the rh found by the `where` argument doesn't exist, create a new rh with this data.
     */
    create: XOR<rhCreateInput, rhUncheckedCreateInput>
    /**
     * In case the rh was found with the provided `where` argument, update it with this data.
     */
    update: XOR<rhUpdateInput, rhUncheckedUpdateInput>
  }

  /**
   * rh delete
   */
  export type rhDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rh
     */
    select?: rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rh
     */
    omit?: rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rhInclude<ExtArgs> | null
    /**
     * Filter which rh to delete.
     */
    where: rhWhereUniqueInput
  }

  /**
   * rh deleteMany
   */
  export type rhDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rhs to delete
     */
    where?: rhWhereInput
    /**
     * Limit how many rhs to delete.
     */
    limit?: number
  }

  /**
   * rh.utilisateur
   */
  export type rh$utilisateurArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: utilisateurInclude<ExtArgs> | null
    where?: utilisateurWhereInput
  }

  /**
   * rh without action
   */
  export type rhDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rh
     */
    select?: rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rh
     */
    omit?: rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rhInclude<ExtArgs> | null
  }


  /**
   * Model types_conge
   */

  export type AggregateTypes_conge = {
    _count: Types_congeCountAggregateOutputType | null
    _avg: Types_congeAvgAggregateOutputType | null
    _sum: Types_congeSumAggregateOutputType | null
    _min: Types_congeMinAggregateOutputType | null
    _max: Types_congeMaxAggregateOutputType | null
  }

  export type Types_congeAvgAggregateOutputType = {
    id_conge: number | null
    id_manager: number | null
    duree: number | null
  }

  export type Types_congeSumAggregateOutputType = {
    id_conge: number | null
    id_manager: number | null
    duree: number | null
  }

  export type Types_congeMinAggregateOutputType = {
    id_conge: number | null
    nom_types_conge: string | null
    statut_types_conge: string | null
    id_manager: number | null
    duree: number | null
  }

  export type Types_congeMaxAggregateOutputType = {
    id_conge: number | null
    nom_types_conge: string | null
    statut_types_conge: string | null
    id_manager: number | null
    duree: number | null
  }

  export type Types_congeCountAggregateOutputType = {
    id_conge: number
    nom_types_conge: number
    statut_types_conge: number
    id_manager: number
    duree: number
    _all: number
  }


  export type Types_congeAvgAggregateInputType = {
    id_conge?: true
    id_manager?: true
    duree?: true
  }

  export type Types_congeSumAggregateInputType = {
    id_conge?: true
    id_manager?: true
    duree?: true
  }

  export type Types_congeMinAggregateInputType = {
    id_conge?: true
    nom_types_conge?: true
    statut_types_conge?: true
    id_manager?: true
    duree?: true
  }

  export type Types_congeMaxAggregateInputType = {
    id_conge?: true
    nom_types_conge?: true
    statut_types_conge?: true
    id_manager?: true
    duree?: true
  }

  export type Types_congeCountAggregateInputType = {
    id_conge?: true
    nom_types_conge?: true
    statut_types_conge?: true
    id_manager?: true
    duree?: true
    _all?: true
  }

  export type Types_congeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which types_conge to aggregate.
     */
    where?: types_congeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of types_conges to fetch.
     */
    orderBy?: types_congeOrderByWithRelationInput | types_congeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: types_congeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` types_conges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` types_conges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned types_conges
    **/
    _count?: true | Types_congeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Types_congeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Types_congeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Types_congeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Types_congeMaxAggregateInputType
  }

  export type GetTypes_congeAggregateType<T extends Types_congeAggregateArgs> = {
        [P in keyof T & keyof AggregateTypes_conge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTypes_conge[P]>
      : GetScalarType<T[P], AggregateTypes_conge[P]>
  }




  export type types_congeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: types_congeWhereInput
    orderBy?: types_congeOrderByWithAggregationInput | types_congeOrderByWithAggregationInput[]
    by: Types_congeScalarFieldEnum[] | Types_congeScalarFieldEnum
    having?: types_congeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Types_congeCountAggregateInputType | true
    _avg?: Types_congeAvgAggregateInputType
    _sum?: Types_congeSumAggregateInputType
    _min?: Types_congeMinAggregateInputType
    _max?: Types_congeMaxAggregateInputType
  }

  export type Types_congeGroupByOutputType = {
    id_conge: number
    nom_types_conge: string
    statut_types_conge: string | null
    id_manager: number | null
    duree: number | null
    _count: Types_congeCountAggregateOutputType | null
    _avg: Types_congeAvgAggregateOutputType | null
    _sum: Types_congeSumAggregateOutputType | null
    _min: Types_congeMinAggregateOutputType | null
    _max: Types_congeMaxAggregateOutputType | null
  }

  type GetTypes_congeGroupByPayload<T extends types_congeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Types_congeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Types_congeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Types_congeGroupByOutputType[P]>
            : GetScalarType<T[P], Types_congeGroupByOutputType[P]>
        }
      >
    >


  export type types_congeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_conge?: boolean
    nom_types_conge?: boolean
    statut_types_conge?: boolean
    id_manager?: boolean
    duree?: boolean
    demandes_conge?: boolean | types_conge$demandes_congeArgs<ExtArgs>
    manager?: boolean | types_conge$managerArgs<ExtArgs>
    _count?: boolean | Types_congeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["types_conge"]>

  export type types_congeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_conge?: boolean
    nom_types_conge?: boolean
    statut_types_conge?: boolean
    id_manager?: boolean
    duree?: boolean
    manager?: boolean | types_conge$managerArgs<ExtArgs>
  }, ExtArgs["result"]["types_conge"]>

  export type types_congeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_conge?: boolean
    nom_types_conge?: boolean
    statut_types_conge?: boolean
    id_manager?: boolean
    duree?: boolean
    manager?: boolean | types_conge$managerArgs<ExtArgs>
  }, ExtArgs["result"]["types_conge"]>

  export type types_congeSelectScalar = {
    id_conge?: boolean
    nom_types_conge?: boolean
    statut_types_conge?: boolean
    id_manager?: boolean
    duree?: boolean
  }

  export type types_congeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_conge" | "nom_types_conge" | "statut_types_conge" | "id_manager" | "duree", ExtArgs["result"]["types_conge"]>
  export type types_congeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demandes_conge?: boolean | types_conge$demandes_congeArgs<ExtArgs>
    manager?: boolean | types_conge$managerArgs<ExtArgs>
    _count?: boolean | Types_congeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type types_congeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | types_conge$managerArgs<ExtArgs>
  }
  export type types_congeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | types_conge$managerArgs<ExtArgs>
  }

  export type $types_congePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "types_conge"
    objects: {
      demandes_conge: Prisma.$demandes_congePayload<ExtArgs>[]
      manager: Prisma.$managerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id_conge: number
      nom_types_conge: string
      statut_types_conge: string | null
      id_manager: number | null
      duree: number | null
    }, ExtArgs["result"]["types_conge"]>
    composites: {}
  }

  type types_congeGetPayload<S extends boolean | null | undefined | types_congeDefaultArgs> = $Result.GetResult<Prisma.$types_congePayload, S>

  type types_congeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<types_congeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Types_congeCountAggregateInputType | true
    }

  export interface types_congeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['types_conge'], meta: { name: 'types_conge' } }
    /**
     * Find zero or one Types_conge that matches the filter.
     * @param {types_congeFindUniqueArgs} args - Arguments to find a Types_conge
     * @example
     * // Get one Types_conge
     * const types_conge = await prisma.types_conge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends types_congeFindUniqueArgs>(args: SelectSubset<T, types_congeFindUniqueArgs<ExtArgs>>): Prisma__types_congeClient<$Result.GetResult<Prisma.$types_congePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Types_conge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {types_congeFindUniqueOrThrowArgs} args - Arguments to find a Types_conge
     * @example
     * // Get one Types_conge
     * const types_conge = await prisma.types_conge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends types_congeFindUniqueOrThrowArgs>(args: SelectSubset<T, types_congeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__types_congeClient<$Result.GetResult<Prisma.$types_congePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Types_conge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {types_congeFindFirstArgs} args - Arguments to find a Types_conge
     * @example
     * // Get one Types_conge
     * const types_conge = await prisma.types_conge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends types_congeFindFirstArgs>(args?: SelectSubset<T, types_congeFindFirstArgs<ExtArgs>>): Prisma__types_congeClient<$Result.GetResult<Prisma.$types_congePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Types_conge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {types_congeFindFirstOrThrowArgs} args - Arguments to find a Types_conge
     * @example
     * // Get one Types_conge
     * const types_conge = await prisma.types_conge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends types_congeFindFirstOrThrowArgs>(args?: SelectSubset<T, types_congeFindFirstOrThrowArgs<ExtArgs>>): Prisma__types_congeClient<$Result.GetResult<Prisma.$types_congePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Types_conges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {types_congeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Types_conges
     * const types_conges = await prisma.types_conge.findMany()
     * 
     * // Get first 10 Types_conges
     * const types_conges = await prisma.types_conge.findMany({ take: 10 })
     * 
     * // Only select the `id_conge`
     * const types_congeWithId_congeOnly = await prisma.types_conge.findMany({ select: { id_conge: true } })
     * 
     */
    findMany<T extends types_congeFindManyArgs>(args?: SelectSubset<T, types_congeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$types_congePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Types_conge.
     * @param {types_congeCreateArgs} args - Arguments to create a Types_conge.
     * @example
     * // Create one Types_conge
     * const Types_conge = await prisma.types_conge.create({
     *   data: {
     *     // ... data to create a Types_conge
     *   }
     * })
     * 
     */
    create<T extends types_congeCreateArgs>(args: SelectSubset<T, types_congeCreateArgs<ExtArgs>>): Prisma__types_congeClient<$Result.GetResult<Prisma.$types_congePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Types_conges.
     * @param {types_congeCreateManyArgs} args - Arguments to create many Types_conges.
     * @example
     * // Create many Types_conges
     * const types_conge = await prisma.types_conge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends types_congeCreateManyArgs>(args?: SelectSubset<T, types_congeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Types_conges and returns the data saved in the database.
     * @param {types_congeCreateManyAndReturnArgs} args - Arguments to create many Types_conges.
     * @example
     * // Create many Types_conges
     * const types_conge = await prisma.types_conge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Types_conges and only return the `id_conge`
     * const types_congeWithId_congeOnly = await prisma.types_conge.createManyAndReturn({
     *   select: { id_conge: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends types_congeCreateManyAndReturnArgs>(args?: SelectSubset<T, types_congeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$types_congePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Types_conge.
     * @param {types_congeDeleteArgs} args - Arguments to delete one Types_conge.
     * @example
     * // Delete one Types_conge
     * const Types_conge = await prisma.types_conge.delete({
     *   where: {
     *     // ... filter to delete one Types_conge
     *   }
     * })
     * 
     */
    delete<T extends types_congeDeleteArgs>(args: SelectSubset<T, types_congeDeleteArgs<ExtArgs>>): Prisma__types_congeClient<$Result.GetResult<Prisma.$types_congePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Types_conge.
     * @param {types_congeUpdateArgs} args - Arguments to update one Types_conge.
     * @example
     * // Update one Types_conge
     * const types_conge = await prisma.types_conge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends types_congeUpdateArgs>(args: SelectSubset<T, types_congeUpdateArgs<ExtArgs>>): Prisma__types_congeClient<$Result.GetResult<Prisma.$types_congePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Types_conges.
     * @param {types_congeDeleteManyArgs} args - Arguments to filter Types_conges to delete.
     * @example
     * // Delete a few Types_conges
     * const { count } = await prisma.types_conge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends types_congeDeleteManyArgs>(args?: SelectSubset<T, types_congeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Types_conges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {types_congeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Types_conges
     * const types_conge = await prisma.types_conge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends types_congeUpdateManyArgs>(args: SelectSubset<T, types_congeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Types_conges and returns the data updated in the database.
     * @param {types_congeUpdateManyAndReturnArgs} args - Arguments to update many Types_conges.
     * @example
     * // Update many Types_conges
     * const types_conge = await prisma.types_conge.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Types_conges and only return the `id_conge`
     * const types_congeWithId_congeOnly = await prisma.types_conge.updateManyAndReturn({
     *   select: { id_conge: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends types_congeUpdateManyAndReturnArgs>(args: SelectSubset<T, types_congeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$types_congePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Types_conge.
     * @param {types_congeUpsertArgs} args - Arguments to update or create a Types_conge.
     * @example
     * // Update or create a Types_conge
     * const types_conge = await prisma.types_conge.upsert({
     *   create: {
     *     // ... data to create a Types_conge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Types_conge we want to update
     *   }
     * })
     */
    upsert<T extends types_congeUpsertArgs>(args: SelectSubset<T, types_congeUpsertArgs<ExtArgs>>): Prisma__types_congeClient<$Result.GetResult<Prisma.$types_congePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Types_conges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {types_congeCountArgs} args - Arguments to filter Types_conges to count.
     * @example
     * // Count the number of Types_conges
     * const count = await prisma.types_conge.count({
     *   where: {
     *     // ... the filter for the Types_conges we want to count
     *   }
     * })
    **/
    count<T extends types_congeCountArgs>(
      args?: Subset<T, types_congeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Types_congeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Types_conge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Types_congeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Types_congeAggregateArgs>(args: Subset<T, Types_congeAggregateArgs>): Prisma.PrismaPromise<GetTypes_congeAggregateType<T>>

    /**
     * Group by Types_conge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {types_congeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends types_congeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: types_congeGroupByArgs['orderBy'] }
        : { orderBy?: types_congeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, types_congeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTypes_congeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the types_conge model
   */
  readonly fields: types_congeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for types_conge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__types_congeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    demandes_conge<T extends types_conge$demandes_congeArgs<ExtArgs> = {}>(args?: Subset<T, types_conge$demandes_congeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$demandes_congePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    manager<T extends types_conge$managerArgs<ExtArgs> = {}>(args?: Subset<T, types_conge$managerArgs<ExtArgs>>): Prisma__managerClient<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the types_conge model
   */
  interface types_congeFieldRefs {
    readonly id_conge: FieldRef<"types_conge", 'Int'>
    readonly nom_types_conge: FieldRef<"types_conge", 'String'>
    readonly statut_types_conge: FieldRef<"types_conge", 'String'>
    readonly id_manager: FieldRef<"types_conge", 'Int'>
    readonly duree: FieldRef<"types_conge", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * types_conge findUnique
   */
  export type types_congeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_conge
     */
    select?: types_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_conge
     */
    omit?: types_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_congeInclude<ExtArgs> | null
    /**
     * Filter, which types_conge to fetch.
     */
    where: types_congeWhereUniqueInput
  }

  /**
   * types_conge findUniqueOrThrow
   */
  export type types_congeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_conge
     */
    select?: types_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_conge
     */
    omit?: types_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_congeInclude<ExtArgs> | null
    /**
     * Filter, which types_conge to fetch.
     */
    where: types_congeWhereUniqueInput
  }

  /**
   * types_conge findFirst
   */
  export type types_congeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_conge
     */
    select?: types_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_conge
     */
    omit?: types_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_congeInclude<ExtArgs> | null
    /**
     * Filter, which types_conge to fetch.
     */
    where?: types_congeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of types_conges to fetch.
     */
    orderBy?: types_congeOrderByWithRelationInput | types_congeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for types_conges.
     */
    cursor?: types_congeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` types_conges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` types_conges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of types_conges.
     */
    distinct?: Types_congeScalarFieldEnum | Types_congeScalarFieldEnum[]
  }

  /**
   * types_conge findFirstOrThrow
   */
  export type types_congeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_conge
     */
    select?: types_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_conge
     */
    omit?: types_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_congeInclude<ExtArgs> | null
    /**
     * Filter, which types_conge to fetch.
     */
    where?: types_congeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of types_conges to fetch.
     */
    orderBy?: types_congeOrderByWithRelationInput | types_congeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for types_conges.
     */
    cursor?: types_congeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` types_conges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` types_conges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of types_conges.
     */
    distinct?: Types_congeScalarFieldEnum | Types_congeScalarFieldEnum[]
  }

  /**
   * types_conge findMany
   */
  export type types_congeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_conge
     */
    select?: types_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_conge
     */
    omit?: types_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_congeInclude<ExtArgs> | null
    /**
     * Filter, which types_conges to fetch.
     */
    where?: types_congeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of types_conges to fetch.
     */
    orderBy?: types_congeOrderByWithRelationInput | types_congeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing types_conges.
     */
    cursor?: types_congeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` types_conges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` types_conges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of types_conges.
     */
    distinct?: Types_congeScalarFieldEnum | Types_congeScalarFieldEnum[]
  }

  /**
   * types_conge create
   */
  export type types_congeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_conge
     */
    select?: types_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_conge
     */
    omit?: types_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_congeInclude<ExtArgs> | null
    /**
     * The data needed to create a types_conge.
     */
    data: XOR<types_congeCreateInput, types_congeUncheckedCreateInput>
  }

  /**
   * types_conge createMany
   */
  export type types_congeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many types_conges.
     */
    data: types_congeCreateManyInput | types_congeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * types_conge createManyAndReturn
   */
  export type types_congeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_conge
     */
    select?: types_congeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the types_conge
     */
    omit?: types_congeOmit<ExtArgs> | null
    /**
     * The data used to create many types_conges.
     */
    data: types_congeCreateManyInput | types_congeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_congeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * types_conge update
   */
  export type types_congeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_conge
     */
    select?: types_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_conge
     */
    omit?: types_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_congeInclude<ExtArgs> | null
    /**
     * The data needed to update a types_conge.
     */
    data: XOR<types_congeUpdateInput, types_congeUncheckedUpdateInput>
    /**
     * Choose, which types_conge to update.
     */
    where: types_congeWhereUniqueInput
  }

  /**
   * types_conge updateMany
   */
  export type types_congeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update types_conges.
     */
    data: XOR<types_congeUpdateManyMutationInput, types_congeUncheckedUpdateManyInput>
    /**
     * Filter which types_conges to update
     */
    where?: types_congeWhereInput
    /**
     * Limit how many types_conges to update.
     */
    limit?: number
  }

  /**
   * types_conge updateManyAndReturn
   */
  export type types_congeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_conge
     */
    select?: types_congeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the types_conge
     */
    omit?: types_congeOmit<ExtArgs> | null
    /**
     * The data used to update types_conges.
     */
    data: XOR<types_congeUpdateManyMutationInput, types_congeUncheckedUpdateManyInput>
    /**
     * Filter which types_conges to update
     */
    where?: types_congeWhereInput
    /**
     * Limit how many types_conges to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_congeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * types_conge upsert
   */
  export type types_congeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_conge
     */
    select?: types_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_conge
     */
    omit?: types_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_congeInclude<ExtArgs> | null
    /**
     * The filter to search for the types_conge to update in case it exists.
     */
    where: types_congeWhereUniqueInput
    /**
     * In case the types_conge found by the `where` argument doesn't exist, create a new types_conge with this data.
     */
    create: XOR<types_congeCreateInput, types_congeUncheckedCreateInput>
    /**
     * In case the types_conge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<types_congeUpdateInput, types_congeUncheckedUpdateInput>
  }

  /**
   * types_conge delete
   */
  export type types_congeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_conge
     */
    select?: types_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_conge
     */
    omit?: types_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_congeInclude<ExtArgs> | null
    /**
     * Filter which types_conge to delete.
     */
    where: types_congeWhereUniqueInput
  }

  /**
   * types_conge deleteMany
   */
  export type types_congeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which types_conges to delete
     */
    where?: types_congeWhereInput
    /**
     * Limit how many types_conges to delete.
     */
    limit?: number
  }

  /**
   * types_conge.demandes_conge
   */
  export type types_conge$demandes_congeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_conge
     */
    select?: demandes_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_conge
     */
    omit?: demandes_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_congeInclude<ExtArgs> | null
    where?: demandes_congeWhereInput
    orderBy?: demandes_congeOrderByWithRelationInput | demandes_congeOrderByWithRelationInput[]
    cursor?: demandes_congeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Demandes_congeScalarFieldEnum | Demandes_congeScalarFieldEnum[]
  }

  /**
   * types_conge.manager
   */
  export type types_conge$managerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
    where?: managerWhereInput
  }

  /**
   * types_conge without action
   */
  export type types_congeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_conge
     */
    select?: types_congeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_conge
     */
    omit?: types_congeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_congeInclude<ExtArgs> | null
  }


  /**
   * Model utilisateur
   */

  export type AggregateUtilisateur = {
    _count: UtilisateurCountAggregateOutputType | null
    _avg: UtilisateurAvgAggregateOutputType | null
    _sum: UtilisateurSumAggregateOutputType | null
    _min: UtilisateurMinAggregateOutputType | null
    _max: UtilisateurMaxAggregateOutputType | null
  }

  export type UtilisateurAvgAggregateOutputType = {
    id_utilisateur: number | null
  }

  export type UtilisateurSumAggregateOutputType = {
    id_utilisateur: number | null
  }

  export type UtilisateurMinAggregateOutputType = {
    id_utilisateur: number | null
    nom_utilisateur: string | null
    prenom: string | null
    mdp: string | null
    mail: string | null
  }

  export type UtilisateurMaxAggregateOutputType = {
    id_utilisateur: number | null
    nom_utilisateur: string | null
    prenom: string | null
    mdp: string | null
    mail: string | null
  }

  export type UtilisateurCountAggregateOutputType = {
    id_utilisateur: number
    nom_utilisateur: number
    prenom: number
    mdp: number
    mail: number
    _all: number
  }


  export type UtilisateurAvgAggregateInputType = {
    id_utilisateur?: true
  }

  export type UtilisateurSumAggregateInputType = {
    id_utilisateur?: true
  }

  export type UtilisateurMinAggregateInputType = {
    id_utilisateur?: true
    nom_utilisateur?: true
    prenom?: true
    mdp?: true
    mail?: true
  }

  export type UtilisateurMaxAggregateInputType = {
    id_utilisateur?: true
    nom_utilisateur?: true
    prenom?: true
    mdp?: true
    mail?: true
  }

  export type UtilisateurCountAggregateInputType = {
    id_utilisateur?: true
    nom_utilisateur?: true
    prenom?: true
    mdp?: true
    mail?: true
    _all?: true
  }

  export type UtilisateurAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which utilisateur to aggregate.
     */
    where?: utilisateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of utilisateurs to fetch.
     */
    orderBy?: utilisateurOrderByWithRelationInput | utilisateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: utilisateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` utilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` utilisateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned utilisateurs
    **/
    _count?: true | UtilisateurCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UtilisateurAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UtilisateurSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UtilisateurMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UtilisateurMaxAggregateInputType
  }

  export type GetUtilisateurAggregateType<T extends UtilisateurAggregateArgs> = {
        [P in keyof T & keyof AggregateUtilisateur]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUtilisateur[P]>
      : GetScalarType<T[P], AggregateUtilisateur[P]>
  }




  export type utilisateurGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: utilisateurWhereInput
    orderBy?: utilisateurOrderByWithAggregationInput | utilisateurOrderByWithAggregationInput[]
    by: UtilisateurScalarFieldEnum[] | UtilisateurScalarFieldEnum
    having?: utilisateurScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UtilisateurCountAggregateInputType | true
    _avg?: UtilisateurAvgAggregateInputType
    _sum?: UtilisateurSumAggregateInputType
    _min?: UtilisateurMinAggregateInputType
    _max?: UtilisateurMaxAggregateInputType
  }

  export type UtilisateurGroupByOutputType = {
    id_utilisateur: number
    nom_utilisateur: string
    prenom: string
    mdp: string
    mail: string
    _count: UtilisateurCountAggregateOutputType | null
    _avg: UtilisateurAvgAggregateOutputType | null
    _sum: UtilisateurSumAggregateOutputType | null
    _min: UtilisateurMinAggregateOutputType | null
    _max: UtilisateurMaxAggregateOutputType | null
  }

  type GetUtilisateurGroupByPayload<T extends utilisateurGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UtilisateurGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UtilisateurGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UtilisateurGroupByOutputType[P]>
            : GetScalarType<T[P], UtilisateurGroupByOutputType[P]>
        }
      >
    >


  export type utilisateurSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_utilisateur?: boolean
    nom_utilisateur?: boolean
    prenom?: boolean
    mdp?: boolean
    mail?: boolean
    employe?: boolean | utilisateur$employeArgs<ExtArgs>
    manager?: boolean | utilisateur$managerArgs<ExtArgs>
    notification?: boolean | utilisateur$notificationArgs<ExtArgs>
    rh?: boolean | utilisateur$rhArgs<ExtArgs>
    _count?: boolean | UtilisateurCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["utilisateur"]>

  export type utilisateurSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_utilisateur?: boolean
    nom_utilisateur?: boolean
    prenom?: boolean
    mdp?: boolean
    mail?: boolean
  }, ExtArgs["result"]["utilisateur"]>

  export type utilisateurSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_utilisateur?: boolean
    nom_utilisateur?: boolean
    prenom?: boolean
    mdp?: boolean
    mail?: boolean
  }, ExtArgs["result"]["utilisateur"]>

  export type utilisateurSelectScalar = {
    id_utilisateur?: boolean
    nom_utilisateur?: boolean
    prenom?: boolean
    mdp?: boolean
    mail?: boolean
  }

  export type utilisateurOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_utilisateur" | "nom_utilisateur" | "prenom" | "mdp" | "mail", ExtArgs["result"]["utilisateur"]>
  export type utilisateurInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employe?: boolean | utilisateur$employeArgs<ExtArgs>
    manager?: boolean | utilisateur$managerArgs<ExtArgs>
    notification?: boolean | utilisateur$notificationArgs<ExtArgs>
    rh?: boolean | utilisateur$rhArgs<ExtArgs>
    _count?: boolean | UtilisateurCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type utilisateurIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type utilisateurIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $utilisateurPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "utilisateur"
    objects: {
      employe: Prisma.$employePayload<ExtArgs> | null
      manager: Prisma.$managerPayload<ExtArgs> | null
      notification: Prisma.$notificationPayload<ExtArgs>[]
      rh: Prisma.$rhPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id_utilisateur: number
      nom_utilisateur: string
      prenom: string
      mdp: string
      mail: string
    }, ExtArgs["result"]["utilisateur"]>
    composites: {}
  }

  type utilisateurGetPayload<S extends boolean | null | undefined | utilisateurDefaultArgs> = $Result.GetResult<Prisma.$utilisateurPayload, S>

  type utilisateurCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<utilisateurFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UtilisateurCountAggregateInputType | true
    }

  export interface utilisateurDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['utilisateur'], meta: { name: 'utilisateur' } }
    /**
     * Find zero or one Utilisateur that matches the filter.
     * @param {utilisateurFindUniqueArgs} args - Arguments to find a Utilisateur
     * @example
     * // Get one Utilisateur
     * const utilisateur = await prisma.utilisateur.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends utilisateurFindUniqueArgs>(args: SelectSubset<T, utilisateurFindUniqueArgs<ExtArgs>>): Prisma__utilisateurClient<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Utilisateur that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {utilisateurFindUniqueOrThrowArgs} args - Arguments to find a Utilisateur
     * @example
     * // Get one Utilisateur
     * const utilisateur = await prisma.utilisateur.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends utilisateurFindUniqueOrThrowArgs>(args: SelectSubset<T, utilisateurFindUniqueOrThrowArgs<ExtArgs>>): Prisma__utilisateurClient<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Utilisateur that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {utilisateurFindFirstArgs} args - Arguments to find a Utilisateur
     * @example
     * // Get one Utilisateur
     * const utilisateur = await prisma.utilisateur.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends utilisateurFindFirstArgs>(args?: SelectSubset<T, utilisateurFindFirstArgs<ExtArgs>>): Prisma__utilisateurClient<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Utilisateur that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {utilisateurFindFirstOrThrowArgs} args - Arguments to find a Utilisateur
     * @example
     * // Get one Utilisateur
     * const utilisateur = await prisma.utilisateur.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends utilisateurFindFirstOrThrowArgs>(args?: SelectSubset<T, utilisateurFindFirstOrThrowArgs<ExtArgs>>): Prisma__utilisateurClient<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Utilisateurs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {utilisateurFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Utilisateurs
     * const utilisateurs = await prisma.utilisateur.findMany()
     * 
     * // Get first 10 Utilisateurs
     * const utilisateurs = await prisma.utilisateur.findMany({ take: 10 })
     * 
     * // Only select the `id_utilisateur`
     * const utilisateurWithId_utilisateurOnly = await prisma.utilisateur.findMany({ select: { id_utilisateur: true } })
     * 
     */
    findMany<T extends utilisateurFindManyArgs>(args?: SelectSubset<T, utilisateurFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Utilisateur.
     * @param {utilisateurCreateArgs} args - Arguments to create a Utilisateur.
     * @example
     * // Create one Utilisateur
     * const Utilisateur = await prisma.utilisateur.create({
     *   data: {
     *     // ... data to create a Utilisateur
     *   }
     * })
     * 
     */
    create<T extends utilisateurCreateArgs>(args: SelectSubset<T, utilisateurCreateArgs<ExtArgs>>): Prisma__utilisateurClient<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Utilisateurs.
     * @param {utilisateurCreateManyArgs} args - Arguments to create many Utilisateurs.
     * @example
     * // Create many Utilisateurs
     * const utilisateur = await prisma.utilisateur.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends utilisateurCreateManyArgs>(args?: SelectSubset<T, utilisateurCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Utilisateurs and returns the data saved in the database.
     * @param {utilisateurCreateManyAndReturnArgs} args - Arguments to create many Utilisateurs.
     * @example
     * // Create many Utilisateurs
     * const utilisateur = await prisma.utilisateur.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Utilisateurs and only return the `id_utilisateur`
     * const utilisateurWithId_utilisateurOnly = await prisma.utilisateur.createManyAndReturn({
     *   select: { id_utilisateur: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends utilisateurCreateManyAndReturnArgs>(args?: SelectSubset<T, utilisateurCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Utilisateur.
     * @param {utilisateurDeleteArgs} args - Arguments to delete one Utilisateur.
     * @example
     * // Delete one Utilisateur
     * const Utilisateur = await prisma.utilisateur.delete({
     *   where: {
     *     // ... filter to delete one Utilisateur
     *   }
     * })
     * 
     */
    delete<T extends utilisateurDeleteArgs>(args: SelectSubset<T, utilisateurDeleteArgs<ExtArgs>>): Prisma__utilisateurClient<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Utilisateur.
     * @param {utilisateurUpdateArgs} args - Arguments to update one Utilisateur.
     * @example
     * // Update one Utilisateur
     * const utilisateur = await prisma.utilisateur.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends utilisateurUpdateArgs>(args: SelectSubset<T, utilisateurUpdateArgs<ExtArgs>>): Prisma__utilisateurClient<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Utilisateurs.
     * @param {utilisateurDeleteManyArgs} args - Arguments to filter Utilisateurs to delete.
     * @example
     * // Delete a few Utilisateurs
     * const { count } = await prisma.utilisateur.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends utilisateurDeleteManyArgs>(args?: SelectSubset<T, utilisateurDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Utilisateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {utilisateurUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Utilisateurs
     * const utilisateur = await prisma.utilisateur.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends utilisateurUpdateManyArgs>(args: SelectSubset<T, utilisateurUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Utilisateurs and returns the data updated in the database.
     * @param {utilisateurUpdateManyAndReturnArgs} args - Arguments to update many Utilisateurs.
     * @example
     * // Update many Utilisateurs
     * const utilisateur = await prisma.utilisateur.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Utilisateurs and only return the `id_utilisateur`
     * const utilisateurWithId_utilisateurOnly = await prisma.utilisateur.updateManyAndReturn({
     *   select: { id_utilisateur: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends utilisateurUpdateManyAndReturnArgs>(args: SelectSubset<T, utilisateurUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Utilisateur.
     * @param {utilisateurUpsertArgs} args - Arguments to update or create a Utilisateur.
     * @example
     * // Update or create a Utilisateur
     * const utilisateur = await prisma.utilisateur.upsert({
     *   create: {
     *     // ... data to create a Utilisateur
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Utilisateur we want to update
     *   }
     * })
     */
    upsert<T extends utilisateurUpsertArgs>(args: SelectSubset<T, utilisateurUpsertArgs<ExtArgs>>): Prisma__utilisateurClient<$Result.GetResult<Prisma.$utilisateurPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Utilisateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {utilisateurCountArgs} args - Arguments to filter Utilisateurs to count.
     * @example
     * // Count the number of Utilisateurs
     * const count = await prisma.utilisateur.count({
     *   where: {
     *     // ... the filter for the Utilisateurs we want to count
     *   }
     * })
    **/
    count<T extends utilisateurCountArgs>(
      args?: Subset<T, utilisateurCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UtilisateurCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Utilisateur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UtilisateurAggregateArgs>(args: Subset<T, UtilisateurAggregateArgs>): Prisma.PrismaPromise<GetUtilisateurAggregateType<T>>

    /**
     * Group by Utilisateur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {utilisateurGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends utilisateurGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: utilisateurGroupByArgs['orderBy'] }
        : { orderBy?: utilisateurGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, utilisateurGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUtilisateurGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the utilisateur model
   */
  readonly fields: utilisateurFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for utilisateur.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__utilisateurClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employe<T extends utilisateur$employeArgs<ExtArgs> = {}>(args?: Subset<T, utilisateur$employeArgs<ExtArgs>>): Prisma__employeClient<$Result.GetResult<Prisma.$employePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    manager<T extends utilisateur$managerArgs<ExtArgs> = {}>(args?: Subset<T, utilisateur$managerArgs<ExtArgs>>): Prisma__managerClient<$Result.GetResult<Prisma.$managerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    notification<T extends utilisateur$notificationArgs<ExtArgs> = {}>(args?: Subset<T, utilisateur$notificationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rh<T extends utilisateur$rhArgs<ExtArgs> = {}>(args?: Subset<T, utilisateur$rhArgs<ExtArgs>>): Prisma__rhClient<$Result.GetResult<Prisma.$rhPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the utilisateur model
   */
  interface utilisateurFieldRefs {
    readonly id_utilisateur: FieldRef<"utilisateur", 'Int'>
    readonly nom_utilisateur: FieldRef<"utilisateur", 'String'>
    readonly prenom: FieldRef<"utilisateur", 'String'>
    readonly mdp: FieldRef<"utilisateur", 'String'>
    readonly mail: FieldRef<"utilisateur", 'String'>
  }
    

  // Custom InputTypes
  /**
   * utilisateur findUnique
   */
  export type utilisateurFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: utilisateurInclude<ExtArgs> | null
    /**
     * Filter, which utilisateur to fetch.
     */
    where: utilisateurWhereUniqueInput
  }

  /**
   * utilisateur findUniqueOrThrow
   */
  export type utilisateurFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: utilisateurInclude<ExtArgs> | null
    /**
     * Filter, which utilisateur to fetch.
     */
    where: utilisateurWhereUniqueInput
  }

  /**
   * utilisateur findFirst
   */
  export type utilisateurFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: utilisateurInclude<ExtArgs> | null
    /**
     * Filter, which utilisateur to fetch.
     */
    where?: utilisateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of utilisateurs to fetch.
     */
    orderBy?: utilisateurOrderByWithRelationInput | utilisateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for utilisateurs.
     */
    cursor?: utilisateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` utilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` utilisateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of utilisateurs.
     */
    distinct?: UtilisateurScalarFieldEnum | UtilisateurScalarFieldEnum[]
  }

  /**
   * utilisateur findFirstOrThrow
   */
  export type utilisateurFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: utilisateurInclude<ExtArgs> | null
    /**
     * Filter, which utilisateur to fetch.
     */
    where?: utilisateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of utilisateurs to fetch.
     */
    orderBy?: utilisateurOrderByWithRelationInput | utilisateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for utilisateurs.
     */
    cursor?: utilisateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` utilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` utilisateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of utilisateurs.
     */
    distinct?: UtilisateurScalarFieldEnum | UtilisateurScalarFieldEnum[]
  }

  /**
   * utilisateur findMany
   */
  export type utilisateurFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: utilisateurInclude<ExtArgs> | null
    /**
     * Filter, which utilisateurs to fetch.
     */
    where?: utilisateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of utilisateurs to fetch.
     */
    orderBy?: utilisateurOrderByWithRelationInput | utilisateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing utilisateurs.
     */
    cursor?: utilisateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` utilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` utilisateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of utilisateurs.
     */
    distinct?: UtilisateurScalarFieldEnum | UtilisateurScalarFieldEnum[]
  }

  /**
   * utilisateur create
   */
  export type utilisateurCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: utilisateurInclude<ExtArgs> | null
    /**
     * The data needed to create a utilisateur.
     */
    data: XOR<utilisateurCreateInput, utilisateurUncheckedCreateInput>
  }

  /**
   * utilisateur createMany
   */
  export type utilisateurCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many utilisateurs.
     */
    data: utilisateurCreateManyInput | utilisateurCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * utilisateur createManyAndReturn
   */
  export type utilisateurCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * The data used to create many utilisateurs.
     */
    data: utilisateurCreateManyInput | utilisateurCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * utilisateur update
   */
  export type utilisateurUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: utilisateurInclude<ExtArgs> | null
    /**
     * The data needed to update a utilisateur.
     */
    data: XOR<utilisateurUpdateInput, utilisateurUncheckedUpdateInput>
    /**
     * Choose, which utilisateur to update.
     */
    where: utilisateurWhereUniqueInput
  }

  /**
   * utilisateur updateMany
   */
  export type utilisateurUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update utilisateurs.
     */
    data: XOR<utilisateurUpdateManyMutationInput, utilisateurUncheckedUpdateManyInput>
    /**
     * Filter which utilisateurs to update
     */
    where?: utilisateurWhereInput
    /**
     * Limit how many utilisateurs to update.
     */
    limit?: number
  }

  /**
   * utilisateur updateManyAndReturn
   */
  export type utilisateurUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * The data used to update utilisateurs.
     */
    data: XOR<utilisateurUpdateManyMutationInput, utilisateurUncheckedUpdateManyInput>
    /**
     * Filter which utilisateurs to update
     */
    where?: utilisateurWhereInput
    /**
     * Limit how many utilisateurs to update.
     */
    limit?: number
  }

  /**
   * utilisateur upsert
   */
  export type utilisateurUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: utilisateurInclude<ExtArgs> | null
    /**
     * The filter to search for the utilisateur to update in case it exists.
     */
    where: utilisateurWhereUniqueInput
    /**
     * In case the utilisateur found by the `where` argument doesn't exist, create a new utilisateur with this data.
     */
    create: XOR<utilisateurCreateInput, utilisateurUncheckedCreateInput>
    /**
     * In case the utilisateur was found with the provided `where` argument, update it with this data.
     */
    update: XOR<utilisateurUpdateInput, utilisateurUncheckedUpdateInput>
  }

  /**
   * utilisateur delete
   */
  export type utilisateurDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: utilisateurInclude<ExtArgs> | null
    /**
     * Filter which utilisateur to delete.
     */
    where: utilisateurWhereUniqueInput
  }

  /**
   * utilisateur deleteMany
   */
  export type utilisateurDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which utilisateurs to delete
     */
    where?: utilisateurWhereInput
    /**
     * Limit how many utilisateurs to delete.
     */
    limit?: number
  }

  /**
   * utilisateur.employe
   */
  export type utilisateur$employeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employe
     */
    select?: employeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employe
     */
    omit?: employeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeInclude<ExtArgs> | null
    where?: employeWhereInput
  }

  /**
   * utilisateur.manager
   */
  export type utilisateur$managerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the manager
     */
    select?: managerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the manager
     */
    omit?: managerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: managerInclude<ExtArgs> | null
    where?: managerWhereInput
  }

  /**
   * utilisateur.notification
   */
  export type utilisateur$notificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notification
     */
    select?: notificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notification
     */
    omit?: notificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationInclude<ExtArgs> | null
    where?: notificationWhereInput
    orderBy?: notificationOrderByWithRelationInput | notificationOrderByWithRelationInput[]
    cursor?: notificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * utilisateur.rh
   */
  export type utilisateur$rhArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rh
     */
    select?: rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rh
     */
    omit?: rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rhInclude<ExtArgs> | null
    where?: rhWhereInput
  }

  /**
   * utilisateur without action
   */
  export type utilisateurDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the utilisateur
     */
    select?: utilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the utilisateur
     */
    omit?: utilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: utilisateurInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Demandes_congeScalarFieldEnum: {
    id_demande_conde: 'id_demande_conde',
    id_employe: 'id_employe',
    id_type_conge: 'id_type_conge',
    motif: 'motif',
    statut_demandes_conge: 'statut_demandes_conge',
    commentaire_manager: 'commentaire_manager',
    commentaire_rh: 'commentaire_rh',
    date_demande: 'date_demande',
    date_debut: 'date_debut',
    date_fin: 'date_fin',
    nombre_jours: 'nombre_jours'
  };

  export type Demandes_congeScalarFieldEnum = (typeof Demandes_congeScalarFieldEnum)[keyof typeof Demandes_congeScalarFieldEnum]


  export const DepartementScalarFieldEnum: {
    id_departement: 'id_departement',
    nom_departement: 'nom_departement',
    id_manager: 'id_manager'
  };

  export type DepartementScalarFieldEnum = (typeof DepartementScalarFieldEnum)[keyof typeof DepartementScalarFieldEnum]


  export const EmployeScalarFieldEnum: {
    id_employe: 'id_employe',
    nom_employe: 'nom_employe',
    prenom_employe: 'prenom_employe',
    telephone_employe: 'telephone_employe',
    adresse_employe: 'adresse_employe',
    statut_employe: 'statut_employe',
    id_departement: 'id_departement',
    id_utilisateur: 'id_utilisateur'
  };

  export type EmployeScalarFieldEnum = (typeof EmployeScalarFieldEnum)[keyof typeof EmployeScalarFieldEnum]


  export const Jours_feriesScalarFieldEnum: {
    id_jours_feries: 'id_jours_feries',
    nom_jours_feries: 'nom_jours_feries',
    date_jours_feries: 'date_jours_feries'
  };

  export type Jours_feriesScalarFieldEnum = (typeof Jours_feriesScalarFieldEnum)[keyof typeof Jours_feriesScalarFieldEnum]


  export const ManagerScalarFieldEnum: {
    id_manager: 'id_manager',
    nom_manager: 'nom_manager',
    prenom_manager: 'prenom_manager',
    telephone_manager: 'telephone_manager',
    adresse_manager: 'adresse_manager',
    statut_manager: 'statut_manager',
    id_departement: 'id_departement',
    id_utilisateur: 'id_utilisateur'
  };

  export type ManagerScalarFieldEnum = (typeof ManagerScalarFieldEnum)[keyof typeof ManagerScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id_notification: 'id_notification',
    id_utilisateur: 'id_utilisateur',
    message: 'message',
    statut_notification: 'statut_notification',
    date_envoie_notification: 'date_envoie_notification'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const RhScalarFieldEnum: {
    id_rh: 'id_rh',
    nom_rh: 'nom_rh',
    prenom_rh: 'prenom_rh',
    telephone_rh: 'telephone_rh',
    adresse_rh: 'adresse_rh',
    statut_rh: 'statut_rh',
    id_utilisateur: 'id_utilisateur'
  };

  export type RhScalarFieldEnum = (typeof RhScalarFieldEnum)[keyof typeof RhScalarFieldEnum]


  export const Types_congeScalarFieldEnum: {
    id_conge: 'id_conge',
    nom_types_conge: 'nom_types_conge',
    statut_types_conge: 'statut_types_conge',
    id_manager: 'id_manager',
    duree: 'duree'
  };

  export type Types_congeScalarFieldEnum = (typeof Types_congeScalarFieldEnum)[keyof typeof Types_congeScalarFieldEnum]


  export const UtilisateurScalarFieldEnum: {
    id_utilisateur: 'id_utilisateur',
    nom_utilisateur: 'nom_utilisateur',
    prenom: 'prenom',
    mdp: 'mdp',
    mail: 'mail'
  };

  export type UtilisateurScalarFieldEnum = (typeof UtilisateurScalarFieldEnum)[keyof typeof UtilisateurScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type demandes_congeWhereInput = {
    AND?: demandes_congeWhereInput | demandes_congeWhereInput[]
    OR?: demandes_congeWhereInput[]
    NOT?: demandes_congeWhereInput | demandes_congeWhereInput[]
    id_demande_conde?: IntFilter<"demandes_conge"> | number
    id_employe?: IntFilter<"demandes_conge"> | number
    id_type_conge?: IntFilter<"demandes_conge"> | number
    motif?: StringNullableFilter<"demandes_conge"> | string | null
    statut_demandes_conge?: StringNullableFilter<"demandes_conge"> | string | null
    commentaire_manager?: StringNullableFilter<"demandes_conge"> | string | null
    commentaire_rh?: StringNullableFilter<"demandes_conge"> | string | null
    date_demande?: DateTimeNullableFilter<"demandes_conge"> | Date | string | null
    date_debut?: DateTimeNullableFilter<"demandes_conge"> | Date | string | null
    date_fin?: DateTimeNullableFilter<"demandes_conge"> | Date | string | null
    nombre_jours?: IntNullableFilter<"demandes_conge"> | number | null
    employe?: XOR<EmployeScalarRelationFilter, employeWhereInput>
    types_conge?: XOR<Types_congeScalarRelationFilter, types_congeWhereInput>
  }

  export type demandes_congeOrderByWithRelationInput = {
    id_demande_conde?: SortOrder
    id_employe?: SortOrder
    id_type_conge?: SortOrder
    motif?: SortOrderInput | SortOrder
    statut_demandes_conge?: SortOrderInput | SortOrder
    commentaire_manager?: SortOrderInput | SortOrder
    commentaire_rh?: SortOrderInput | SortOrder
    date_demande?: SortOrderInput | SortOrder
    date_debut?: SortOrderInput | SortOrder
    date_fin?: SortOrderInput | SortOrder
    nombre_jours?: SortOrderInput | SortOrder
    employe?: employeOrderByWithRelationInput
    types_conge?: types_congeOrderByWithRelationInput
  }

  export type demandes_congeWhereUniqueInput = Prisma.AtLeast<{
    id_demande_conde?: number
    AND?: demandes_congeWhereInput | demandes_congeWhereInput[]
    OR?: demandes_congeWhereInput[]
    NOT?: demandes_congeWhereInput | demandes_congeWhereInput[]
    id_employe?: IntFilter<"demandes_conge"> | number
    id_type_conge?: IntFilter<"demandes_conge"> | number
    motif?: StringNullableFilter<"demandes_conge"> | string | null
    statut_demandes_conge?: StringNullableFilter<"demandes_conge"> | string | null
    commentaire_manager?: StringNullableFilter<"demandes_conge"> | string | null
    commentaire_rh?: StringNullableFilter<"demandes_conge"> | string | null
    date_demande?: DateTimeNullableFilter<"demandes_conge"> | Date | string | null
    date_debut?: DateTimeNullableFilter<"demandes_conge"> | Date | string | null
    date_fin?: DateTimeNullableFilter<"demandes_conge"> | Date | string | null
    nombre_jours?: IntNullableFilter<"demandes_conge"> | number | null
    employe?: XOR<EmployeScalarRelationFilter, employeWhereInput>
    types_conge?: XOR<Types_congeScalarRelationFilter, types_congeWhereInput>
  }, "id_demande_conde">

  export type demandes_congeOrderByWithAggregationInput = {
    id_demande_conde?: SortOrder
    id_employe?: SortOrder
    id_type_conge?: SortOrder
    motif?: SortOrderInput | SortOrder
    statut_demandes_conge?: SortOrderInput | SortOrder
    commentaire_manager?: SortOrderInput | SortOrder
    commentaire_rh?: SortOrderInput | SortOrder
    date_demande?: SortOrderInput | SortOrder
    date_debut?: SortOrderInput | SortOrder
    date_fin?: SortOrderInput | SortOrder
    nombre_jours?: SortOrderInput | SortOrder
    _count?: demandes_congeCountOrderByAggregateInput
    _avg?: demandes_congeAvgOrderByAggregateInput
    _max?: demandes_congeMaxOrderByAggregateInput
    _min?: demandes_congeMinOrderByAggregateInput
    _sum?: demandes_congeSumOrderByAggregateInput
  }

  export type demandes_congeScalarWhereWithAggregatesInput = {
    AND?: demandes_congeScalarWhereWithAggregatesInput | demandes_congeScalarWhereWithAggregatesInput[]
    OR?: demandes_congeScalarWhereWithAggregatesInput[]
    NOT?: demandes_congeScalarWhereWithAggregatesInput | demandes_congeScalarWhereWithAggregatesInput[]
    id_demande_conde?: IntWithAggregatesFilter<"demandes_conge"> | number
    id_employe?: IntWithAggregatesFilter<"demandes_conge"> | number
    id_type_conge?: IntWithAggregatesFilter<"demandes_conge"> | number
    motif?: StringNullableWithAggregatesFilter<"demandes_conge"> | string | null
    statut_demandes_conge?: StringNullableWithAggregatesFilter<"demandes_conge"> | string | null
    commentaire_manager?: StringNullableWithAggregatesFilter<"demandes_conge"> | string | null
    commentaire_rh?: StringNullableWithAggregatesFilter<"demandes_conge"> | string | null
    date_demande?: DateTimeNullableWithAggregatesFilter<"demandes_conge"> | Date | string | null
    date_debut?: DateTimeNullableWithAggregatesFilter<"demandes_conge"> | Date | string | null
    date_fin?: DateTimeNullableWithAggregatesFilter<"demandes_conge"> | Date | string | null
    nombre_jours?: IntNullableWithAggregatesFilter<"demandes_conge"> | number | null
  }

  export type departementWhereInput = {
    AND?: departementWhereInput | departementWhereInput[]
    OR?: departementWhereInput[]
    NOT?: departementWhereInput | departementWhereInput[]
    id_departement?: IntFilter<"departement"> | number
    nom_departement?: StringFilter<"departement"> | string
    id_manager?: IntNullableFilter<"departement"> | number | null
    manager_departement_id_managerTomanager?: XOR<ManagerNullableScalarRelationFilter, managerWhereInput> | null
    employe?: EmployeListRelationFilter
    manager_manager_id_departementTodepartement?: ManagerListRelationFilter
  }

  export type departementOrderByWithRelationInput = {
    id_departement?: SortOrder
    nom_departement?: SortOrder
    id_manager?: SortOrderInput | SortOrder
    manager_departement_id_managerTomanager?: managerOrderByWithRelationInput
    employe?: employeOrderByRelationAggregateInput
    manager_manager_id_departementTodepartement?: managerOrderByRelationAggregateInput
  }

  export type departementWhereUniqueInput = Prisma.AtLeast<{
    id_departement?: number
    AND?: departementWhereInput | departementWhereInput[]
    OR?: departementWhereInput[]
    NOT?: departementWhereInput | departementWhereInput[]
    nom_departement?: StringFilter<"departement"> | string
    id_manager?: IntNullableFilter<"departement"> | number | null
    manager_departement_id_managerTomanager?: XOR<ManagerNullableScalarRelationFilter, managerWhereInput> | null
    employe?: EmployeListRelationFilter
    manager_manager_id_departementTodepartement?: ManagerListRelationFilter
  }, "id_departement">

  export type departementOrderByWithAggregationInput = {
    id_departement?: SortOrder
    nom_departement?: SortOrder
    id_manager?: SortOrderInput | SortOrder
    _count?: departementCountOrderByAggregateInput
    _avg?: departementAvgOrderByAggregateInput
    _max?: departementMaxOrderByAggregateInput
    _min?: departementMinOrderByAggregateInput
    _sum?: departementSumOrderByAggregateInput
  }

  export type departementScalarWhereWithAggregatesInput = {
    AND?: departementScalarWhereWithAggregatesInput | departementScalarWhereWithAggregatesInput[]
    OR?: departementScalarWhereWithAggregatesInput[]
    NOT?: departementScalarWhereWithAggregatesInput | departementScalarWhereWithAggregatesInput[]
    id_departement?: IntWithAggregatesFilter<"departement"> | number
    nom_departement?: StringWithAggregatesFilter<"departement"> | string
    id_manager?: IntNullableWithAggregatesFilter<"departement"> | number | null
  }

  export type employeWhereInput = {
    AND?: employeWhereInput | employeWhereInput[]
    OR?: employeWhereInput[]
    NOT?: employeWhereInput | employeWhereInput[]
    id_employe?: IntFilter<"employe"> | number
    nom_employe?: StringFilter<"employe"> | string
    prenom_employe?: StringFilter<"employe"> | string
    telephone_employe?: StringNullableFilter<"employe"> | string | null
    adresse_employe?: StringNullableFilter<"employe"> | string | null
    statut_employe?: StringNullableFilter<"employe"> | string | null
    id_departement?: IntNullableFilter<"employe"> | number | null
    id_utilisateur?: IntNullableFilter<"employe"> | number | null
    demandes_conge?: Demandes_congeListRelationFilter
    departement?: XOR<DepartementNullableScalarRelationFilter, departementWhereInput> | null
    utilisateur?: XOR<UtilisateurNullableScalarRelationFilter, utilisateurWhereInput> | null
  }

  export type employeOrderByWithRelationInput = {
    id_employe?: SortOrder
    nom_employe?: SortOrder
    prenom_employe?: SortOrder
    telephone_employe?: SortOrderInput | SortOrder
    adresse_employe?: SortOrderInput | SortOrder
    statut_employe?: SortOrderInput | SortOrder
    id_departement?: SortOrderInput | SortOrder
    id_utilisateur?: SortOrderInput | SortOrder
    demandes_conge?: demandes_congeOrderByRelationAggregateInput
    departement?: departementOrderByWithRelationInput
    utilisateur?: utilisateurOrderByWithRelationInput
  }

  export type employeWhereUniqueInput = Prisma.AtLeast<{
    id_employe?: number
    id_utilisateur?: number
    AND?: employeWhereInput | employeWhereInput[]
    OR?: employeWhereInput[]
    NOT?: employeWhereInput | employeWhereInput[]
    nom_employe?: StringFilter<"employe"> | string
    prenom_employe?: StringFilter<"employe"> | string
    telephone_employe?: StringNullableFilter<"employe"> | string | null
    adresse_employe?: StringNullableFilter<"employe"> | string | null
    statut_employe?: StringNullableFilter<"employe"> | string | null
    id_departement?: IntNullableFilter<"employe"> | number | null
    demandes_conge?: Demandes_congeListRelationFilter
    departement?: XOR<DepartementNullableScalarRelationFilter, departementWhereInput> | null
    utilisateur?: XOR<UtilisateurNullableScalarRelationFilter, utilisateurWhereInput> | null
  }, "id_employe" | "id_utilisateur">

  export type employeOrderByWithAggregationInput = {
    id_employe?: SortOrder
    nom_employe?: SortOrder
    prenom_employe?: SortOrder
    telephone_employe?: SortOrderInput | SortOrder
    adresse_employe?: SortOrderInput | SortOrder
    statut_employe?: SortOrderInput | SortOrder
    id_departement?: SortOrderInput | SortOrder
    id_utilisateur?: SortOrderInput | SortOrder
    _count?: employeCountOrderByAggregateInput
    _avg?: employeAvgOrderByAggregateInput
    _max?: employeMaxOrderByAggregateInput
    _min?: employeMinOrderByAggregateInput
    _sum?: employeSumOrderByAggregateInput
  }

  export type employeScalarWhereWithAggregatesInput = {
    AND?: employeScalarWhereWithAggregatesInput | employeScalarWhereWithAggregatesInput[]
    OR?: employeScalarWhereWithAggregatesInput[]
    NOT?: employeScalarWhereWithAggregatesInput | employeScalarWhereWithAggregatesInput[]
    id_employe?: IntWithAggregatesFilter<"employe"> | number
    nom_employe?: StringWithAggregatesFilter<"employe"> | string
    prenom_employe?: StringWithAggregatesFilter<"employe"> | string
    telephone_employe?: StringNullableWithAggregatesFilter<"employe"> | string | null
    adresse_employe?: StringNullableWithAggregatesFilter<"employe"> | string | null
    statut_employe?: StringNullableWithAggregatesFilter<"employe"> | string | null
    id_departement?: IntNullableWithAggregatesFilter<"employe"> | number | null
    id_utilisateur?: IntNullableWithAggregatesFilter<"employe"> | number | null
  }

  export type jours_feriesWhereInput = {
    AND?: jours_feriesWhereInput | jours_feriesWhereInput[]
    OR?: jours_feriesWhereInput[]
    NOT?: jours_feriesWhereInput | jours_feriesWhereInput[]
    id_jours_feries?: IntFilter<"jours_feries"> | number
    nom_jours_feries?: StringFilter<"jours_feries"> | string
    date_jours_feries?: DateTimeFilter<"jours_feries"> | Date | string
  }

  export type jours_feriesOrderByWithRelationInput = {
    id_jours_feries?: SortOrder
    nom_jours_feries?: SortOrder
    date_jours_feries?: SortOrder
  }

  export type jours_feriesWhereUniqueInput = Prisma.AtLeast<{
    id_jours_feries?: number
    AND?: jours_feriesWhereInput | jours_feriesWhereInput[]
    OR?: jours_feriesWhereInput[]
    NOT?: jours_feriesWhereInput | jours_feriesWhereInput[]
    nom_jours_feries?: StringFilter<"jours_feries"> | string
    date_jours_feries?: DateTimeFilter<"jours_feries"> | Date | string
  }, "id_jours_feries">

  export type jours_feriesOrderByWithAggregationInput = {
    id_jours_feries?: SortOrder
    nom_jours_feries?: SortOrder
    date_jours_feries?: SortOrder
    _count?: jours_feriesCountOrderByAggregateInput
    _avg?: jours_feriesAvgOrderByAggregateInput
    _max?: jours_feriesMaxOrderByAggregateInput
    _min?: jours_feriesMinOrderByAggregateInput
    _sum?: jours_feriesSumOrderByAggregateInput
  }

  export type jours_feriesScalarWhereWithAggregatesInput = {
    AND?: jours_feriesScalarWhereWithAggregatesInput | jours_feriesScalarWhereWithAggregatesInput[]
    OR?: jours_feriesScalarWhereWithAggregatesInput[]
    NOT?: jours_feriesScalarWhereWithAggregatesInput | jours_feriesScalarWhereWithAggregatesInput[]
    id_jours_feries?: IntWithAggregatesFilter<"jours_feries"> | number
    nom_jours_feries?: StringWithAggregatesFilter<"jours_feries"> | string
    date_jours_feries?: DateTimeWithAggregatesFilter<"jours_feries"> | Date | string
  }

  export type managerWhereInput = {
    AND?: managerWhereInput | managerWhereInput[]
    OR?: managerWhereInput[]
    NOT?: managerWhereInput | managerWhereInput[]
    id_manager?: IntFilter<"manager"> | number
    nom_manager?: StringFilter<"manager"> | string
    prenom_manager?: StringFilter<"manager"> | string
    telephone_manager?: StringNullableFilter<"manager"> | string | null
    adresse_manager?: StringNullableFilter<"manager"> | string | null
    statut_manager?: StringNullableFilter<"manager"> | string | null
    id_departement?: IntNullableFilter<"manager"> | number | null
    id_utilisateur?: IntNullableFilter<"manager"> | number | null
    departement_departement_id_managerTomanager?: DepartementListRelationFilter
    departement_manager_id_departementTodepartement?: XOR<DepartementNullableScalarRelationFilter, departementWhereInput> | null
    utilisateur?: XOR<UtilisateurNullableScalarRelationFilter, utilisateurWhereInput> | null
    types_conge?: Types_congeListRelationFilter
  }

  export type managerOrderByWithRelationInput = {
    id_manager?: SortOrder
    nom_manager?: SortOrder
    prenom_manager?: SortOrder
    telephone_manager?: SortOrderInput | SortOrder
    adresse_manager?: SortOrderInput | SortOrder
    statut_manager?: SortOrderInput | SortOrder
    id_departement?: SortOrderInput | SortOrder
    id_utilisateur?: SortOrderInput | SortOrder
    departement_departement_id_managerTomanager?: departementOrderByRelationAggregateInput
    departement_manager_id_departementTodepartement?: departementOrderByWithRelationInput
    utilisateur?: utilisateurOrderByWithRelationInput
    types_conge?: types_congeOrderByRelationAggregateInput
  }

  export type managerWhereUniqueInput = Prisma.AtLeast<{
    id_manager?: number
    id_utilisateur?: number
    AND?: managerWhereInput | managerWhereInput[]
    OR?: managerWhereInput[]
    NOT?: managerWhereInput | managerWhereInput[]
    nom_manager?: StringFilter<"manager"> | string
    prenom_manager?: StringFilter<"manager"> | string
    telephone_manager?: StringNullableFilter<"manager"> | string | null
    adresse_manager?: StringNullableFilter<"manager"> | string | null
    statut_manager?: StringNullableFilter<"manager"> | string | null
    id_departement?: IntNullableFilter<"manager"> | number | null
    departement_departement_id_managerTomanager?: DepartementListRelationFilter
    departement_manager_id_departementTodepartement?: XOR<DepartementNullableScalarRelationFilter, departementWhereInput> | null
    utilisateur?: XOR<UtilisateurNullableScalarRelationFilter, utilisateurWhereInput> | null
    types_conge?: Types_congeListRelationFilter
  }, "id_manager" | "id_utilisateur">

  export type managerOrderByWithAggregationInput = {
    id_manager?: SortOrder
    nom_manager?: SortOrder
    prenom_manager?: SortOrder
    telephone_manager?: SortOrderInput | SortOrder
    adresse_manager?: SortOrderInput | SortOrder
    statut_manager?: SortOrderInput | SortOrder
    id_departement?: SortOrderInput | SortOrder
    id_utilisateur?: SortOrderInput | SortOrder
    _count?: managerCountOrderByAggregateInput
    _avg?: managerAvgOrderByAggregateInput
    _max?: managerMaxOrderByAggregateInput
    _min?: managerMinOrderByAggregateInput
    _sum?: managerSumOrderByAggregateInput
  }

  export type managerScalarWhereWithAggregatesInput = {
    AND?: managerScalarWhereWithAggregatesInput | managerScalarWhereWithAggregatesInput[]
    OR?: managerScalarWhereWithAggregatesInput[]
    NOT?: managerScalarWhereWithAggregatesInput | managerScalarWhereWithAggregatesInput[]
    id_manager?: IntWithAggregatesFilter<"manager"> | number
    nom_manager?: StringWithAggregatesFilter<"manager"> | string
    prenom_manager?: StringWithAggregatesFilter<"manager"> | string
    telephone_manager?: StringNullableWithAggregatesFilter<"manager"> | string | null
    adresse_manager?: StringNullableWithAggregatesFilter<"manager"> | string | null
    statut_manager?: StringNullableWithAggregatesFilter<"manager"> | string | null
    id_departement?: IntNullableWithAggregatesFilter<"manager"> | number | null
    id_utilisateur?: IntNullableWithAggregatesFilter<"manager"> | number | null
  }

  export type notificationWhereInput = {
    AND?: notificationWhereInput | notificationWhereInput[]
    OR?: notificationWhereInput[]
    NOT?: notificationWhereInput | notificationWhereInput[]
    id_notification?: IntFilter<"notification"> | number
    id_utilisateur?: IntFilter<"notification"> | number
    message?: StringFilter<"notification"> | string
    statut_notification?: StringNullableFilter<"notification"> | string | null
    date_envoie_notification?: DateTimeNullableFilter<"notification"> | Date | string | null
    utilisateur?: XOR<UtilisateurScalarRelationFilter, utilisateurWhereInput>
  }

  export type notificationOrderByWithRelationInput = {
    id_notification?: SortOrder
    id_utilisateur?: SortOrder
    message?: SortOrder
    statut_notification?: SortOrderInput | SortOrder
    date_envoie_notification?: SortOrderInput | SortOrder
    utilisateur?: utilisateurOrderByWithRelationInput
  }

  export type notificationWhereUniqueInput = Prisma.AtLeast<{
    id_notification?: number
    AND?: notificationWhereInput | notificationWhereInput[]
    OR?: notificationWhereInput[]
    NOT?: notificationWhereInput | notificationWhereInput[]
    id_utilisateur?: IntFilter<"notification"> | number
    message?: StringFilter<"notification"> | string
    statut_notification?: StringNullableFilter<"notification"> | string | null
    date_envoie_notification?: DateTimeNullableFilter<"notification"> | Date | string | null
    utilisateur?: XOR<UtilisateurScalarRelationFilter, utilisateurWhereInput>
  }, "id_notification">

  export type notificationOrderByWithAggregationInput = {
    id_notification?: SortOrder
    id_utilisateur?: SortOrder
    message?: SortOrder
    statut_notification?: SortOrderInput | SortOrder
    date_envoie_notification?: SortOrderInput | SortOrder
    _count?: notificationCountOrderByAggregateInput
    _avg?: notificationAvgOrderByAggregateInput
    _max?: notificationMaxOrderByAggregateInput
    _min?: notificationMinOrderByAggregateInput
    _sum?: notificationSumOrderByAggregateInput
  }

  export type notificationScalarWhereWithAggregatesInput = {
    AND?: notificationScalarWhereWithAggregatesInput | notificationScalarWhereWithAggregatesInput[]
    OR?: notificationScalarWhereWithAggregatesInput[]
    NOT?: notificationScalarWhereWithAggregatesInput | notificationScalarWhereWithAggregatesInput[]
    id_notification?: IntWithAggregatesFilter<"notification"> | number
    id_utilisateur?: IntWithAggregatesFilter<"notification"> | number
    message?: StringWithAggregatesFilter<"notification"> | string
    statut_notification?: StringNullableWithAggregatesFilter<"notification"> | string | null
    date_envoie_notification?: DateTimeNullableWithAggregatesFilter<"notification"> | Date | string | null
  }

  export type rhWhereInput = {
    AND?: rhWhereInput | rhWhereInput[]
    OR?: rhWhereInput[]
    NOT?: rhWhereInput | rhWhereInput[]
    id_rh?: IntFilter<"rh"> | number
    nom_rh?: StringFilter<"rh"> | string
    prenom_rh?: StringFilter<"rh"> | string
    telephone_rh?: StringNullableFilter<"rh"> | string | null
    adresse_rh?: StringNullableFilter<"rh"> | string | null
    statut_rh?: StringNullableFilter<"rh"> | string | null
    id_utilisateur?: IntNullableFilter<"rh"> | number | null
    utilisateur?: XOR<UtilisateurNullableScalarRelationFilter, utilisateurWhereInput> | null
  }

  export type rhOrderByWithRelationInput = {
    id_rh?: SortOrder
    nom_rh?: SortOrder
    prenom_rh?: SortOrder
    telephone_rh?: SortOrderInput | SortOrder
    adresse_rh?: SortOrderInput | SortOrder
    statut_rh?: SortOrderInput | SortOrder
    id_utilisateur?: SortOrderInput | SortOrder
    utilisateur?: utilisateurOrderByWithRelationInput
  }

  export type rhWhereUniqueInput = Prisma.AtLeast<{
    id_rh?: number
    id_utilisateur?: number
    AND?: rhWhereInput | rhWhereInput[]
    OR?: rhWhereInput[]
    NOT?: rhWhereInput | rhWhereInput[]
    nom_rh?: StringFilter<"rh"> | string
    prenom_rh?: StringFilter<"rh"> | string
    telephone_rh?: StringNullableFilter<"rh"> | string | null
    adresse_rh?: StringNullableFilter<"rh"> | string | null
    statut_rh?: StringNullableFilter<"rh"> | string | null
    utilisateur?: XOR<UtilisateurNullableScalarRelationFilter, utilisateurWhereInput> | null
  }, "id_rh" | "id_utilisateur">

  export type rhOrderByWithAggregationInput = {
    id_rh?: SortOrder
    nom_rh?: SortOrder
    prenom_rh?: SortOrder
    telephone_rh?: SortOrderInput | SortOrder
    adresse_rh?: SortOrderInput | SortOrder
    statut_rh?: SortOrderInput | SortOrder
    id_utilisateur?: SortOrderInput | SortOrder
    _count?: rhCountOrderByAggregateInput
    _avg?: rhAvgOrderByAggregateInput
    _max?: rhMaxOrderByAggregateInput
    _min?: rhMinOrderByAggregateInput
    _sum?: rhSumOrderByAggregateInput
  }

  export type rhScalarWhereWithAggregatesInput = {
    AND?: rhScalarWhereWithAggregatesInput | rhScalarWhereWithAggregatesInput[]
    OR?: rhScalarWhereWithAggregatesInput[]
    NOT?: rhScalarWhereWithAggregatesInput | rhScalarWhereWithAggregatesInput[]
    id_rh?: IntWithAggregatesFilter<"rh"> | number
    nom_rh?: StringWithAggregatesFilter<"rh"> | string
    prenom_rh?: StringWithAggregatesFilter<"rh"> | string
    telephone_rh?: StringNullableWithAggregatesFilter<"rh"> | string | null
    adresse_rh?: StringNullableWithAggregatesFilter<"rh"> | string | null
    statut_rh?: StringNullableWithAggregatesFilter<"rh"> | string | null
    id_utilisateur?: IntNullableWithAggregatesFilter<"rh"> | number | null
  }

  export type types_congeWhereInput = {
    AND?: types_congeWhereInput | types_congeWhereInput[]
    OR?: types_congeWhereInput[]
    NOT?: types_congeWhereInput | types_congeWhereInput[]
    id_conge?: IntFilter<"types_conge"> | number
    nom_types_conge?: StringFilter<"types_conge"> | string
    statut_types_conge?: StringNullableFilter<"types_conge"> | string | null
    id_manager?: IntNullableFilter<"types_conge"> | number | null
    duree?: IntNullableFilter<"types_conge"> | number | null
    demandes_conge?: Demandes_congeListRelationFilter
    manager?: XOR<ManagerNullableScalarRelationFilter, managerWhereInput> | null
  }

  export type types_congeOrderByWithRelationInput = {
    id_conge?: SortOrder
    nom_types_conge?: SortOrder
    statut_types_conge?: SortOrderInput | SortOrder
    id_manager?: SortOrderInput | SortOrder
    duree?: SortOrderInput | SortOrder
    demandes_conge?: demandes_congeOrderByRelationAggregateInput
    manager?: managerOrderByWithRelationInput
  }

  export type types_congeWhereUniqueInput = Prisma.AtLeast<{
    id_conge?: number
    AND?: types_congeWhereInput | types_congeWhereInput[]
    OR?: types_congeWhereInput[]
    NOT?: types_congeWhereInput | types_congeWhereInput[]
    nom_types_conge?: StringFilter<"types_conge"> | string
    statut_types_conge?: StringNullableFilter<"types_conge"> | string | null
    id_manager?: IntNullableFilter<"types_conge"> | number | null
    duree?: IntNullableFilter<"types_conge"> | number | null
    demandes_conge?: Demandes_congeListRelationFilter
    manager?: XOR<ManagerNullableScalarRelationFilter, managerWhereInput> | null
  }, "id_conge">

  export type types_congeOrderByWithAggregationInput = {
    id_conge?: SortOrder
    nom_types_conge?: SortOrder
    statut_types_conge?: SortOrderInput | SortOrder
    id_manager?: SortOrderInput | SortOrder
    duree?: SortOrderInput | SortOrder
    _count?: types_congeCountOrderByAggregateInput
    _avg?: types_congeAvgOrderByAggregateInput
    _max?: types_congeMaxOrderByAggregateInput
    _min?: types_congeMinOrderByAggregateInput
    _sum?: types_congeSumOrderByAggregateInput
  }

  export type types_congeScalarWhereWithAggregatesInput = {
    AND?: types_congeScalarWhereWithAggregatesInput | types_congeScalarWhereWithAggregatesInput[]
    OR?: types_congeScalarWhereWithAggregatesInput[]
    NOT?: types_congeScalarWhereWithAggregatesInput | types_congeScalarWhereWithAggregatesInput[]
    id_conge?: IntWithAggregatesFilter<"types_conge"> | number
    nom_types_conge?: StringWithAggregatesFilter<"types_conge"> | string
    statut_types_conge?: StringNullableWithAggregatesFilter<"types_conge"> | string | null
    id_manager?: IntNullableWithAggregatesFilter<"types_conge"> | number | null
    duree?: IntNullableWithAggregatesFilter<"types_conge"> | number | null
  }

  export type utilisateurWhereInput = {
    AND?: utilisateurWhereInput | utilisateurWhereInput[]
    OR?: utilisateurWhereInput[]
    NOT?: utilisateurWhereInput | utilisateurWhereInput[]
    id_utilisateur?: IntFilter<"utilisateur"> | number
    nom_utilisateur?: StringFilter<"utilisateur"> | string
    prenom?: StringFilter<"utilisateur"> | string
    mdp?: StringFilter<"utilisateur"> | string
    mail?: StringFilter<"utilisateur"> | string
    employe?: XOR<EmployeNullableScalarRelationFilter, employeWhereInput> | null
    manager?: XOR<ManagerNullableScalarRelationFilter, managerWhereInput> | null
    notification?: NotificationListRelationFilter
    rh?: XOR<RhNullableScalarRelationFilter, rhWhereInput> | null
  }

  export type utilisateurOrderByWithRelationInput = {
    id_utilisateur?: SortOrder
    nom_utilisateur?: SortOrder
    prenom?: SortOrder
    mdp?: SortOrder
    mail?: SortOrder
    employe?: employeOrderByWithRelationInput
    manager?: managerOrderByWithRelationInput
    notification?: notificationOrderByRelationAggregateInput
    rh?: rhOrderByWithRelationInput
  }

  export type utilisateurWhereUniqueInput = Prisma.AtLeast<{
    id_utilisateur?: number
    mail?: string
    AND?: utilisateurWhereInput | utilisateurWhereInput[]
    OR?: utilisateurWhereInput[]
    NOT?: utilisateurWhereInput | utilisateurWhereInput[]
    nom_utilisateur?: StringFilter<"utilisateur"> | string
    prenom?: StringFilter<"utilisateur"> | string
    mdp?: StringFilter<"utilisateur"> | string
    employe?: XOR<EmployeNullableScalarRelationFilter, employeWhereInput> | null
    manager?: XOR<ManagerNullableScalarRelationFilter, managerWhereInput> | null
    notification?: NotificationListRelationFilter
    rh?: XOR<RhNullableScalarRelationFilter, rhWhereInput> | null
  }, "id_utilisateur" | "mail">

  export type utilisateurOrderByWithAggregationInput = {
    id_utilisateur?: SortOrder
    nom_utilisateur?: SortOrder
    prenom?: SortOrder
    mdp?: SortOrder
    mail?: SortOrder
    _count?: utilisateurCountOrderByAggregateInput
    _avg?: utilisateurAvgOrderByAggregateInput
    _max?: utilisateurMaxOrderByAggregateInput
    _min?: utilisateurMinOrderByAggregateInput
    _sum?: utilisateurSumOrderByAggregateInput
  }

  export type utilisateurScalarWhereWithAggregatesInput = {
    AND?: utilisateurScalarWhereWithAggregatesInput | utilisateurScalarWhereWithAggregatesInput[]
    OR?: utilisateurScalarWhereWithAggregatesInput[]
    NOT?: utilisateurScalarWhereWithAggregatesInput | utilisateurScalarWhereWithAggregatesInput[]
    id_utilisateur?: IntWithAggregatesFilter<"utilisateur"> | number
    nom_utilisateur?: StringWithAggregatesFilter<"utilisateur"> | string
    prenom?: StringWithAggregatesFilter<"utilisateur"> | string
    mdp?: StringWithAggregatesFilter<"utilisateur"> | string
    mail?: StringWithAggregatesFilter<"utilisateur"> | string
  }

  export type demandes_congeCreateInput = {
    motif?: string | null
    statut_demandes_conge?: string | null
    commentaire_manager?: string | null
    commentaire_rh?: string | null
    date_demande?: Date | string | null
    date_debut?: Date | string | null
    date_fin?: Date | string | null
    nombre_jours?: number | null
    employe: employeCreateNestedOneWithoutDemandes_congeInput
    types_conge: types_congeCreateNestedOneWithoutDemandes_congeInput
  }

  export type demandes_congeUncheckedCreateInput = {
    id_demande_conde?: number
    id_employe: number
    id_type_conge: number
    motif?: string | null
    statut_demandes_conge?: string | null
    commentaire_manager?: string | null
    commentaire_rh?: string | null
    date_demande?: Date | string | null
    date_debut?: Date | string | null
    date_fin?: Date | string | null
    nombre_jours?: number | null
  }

  export type demandes_congeUpdateInput = {
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    statut_demandes_conge?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_manager?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_rh?: NullableStringFieldUpdateOperationsInput | string | null
    date_demande?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_debut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre_jours?: NullableIntFieldUpdateOperationsInput | number | null
    employe?: employeUpdateOneRequiredWithoutDemandes_congeNestedInput
    types_conge?: types_congeUpdateOneRequiredWithoutDemandes_congeNestedInput
  }

  export type demandes_congeUncheckedUpdateInput = {
    id_demande_conde?: IntFieldUpdateOperationsInput | number
    id_employe?: IntFieldUpdateOperationsInput | number
    id_type_conge?: IntFieldUpdateOperationsInput | number
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    statut_demandes_conge?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_manager?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_rh?: NullableStringFieldUpdateOperationsInput | string | null
    date_demande?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_debut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre_jours?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type demandes_congeCreateManyInput = {
    id_demande_conde?: number
    id_employe: number
    id_type_conge: number
    motif?: string | null
    statut_demandes_conge?: string | null
    commentaire_manager?: string | null
    commentaire_rh?: string | null
    date_demande?: Date | string | null
    date_debut?: Date | string | null
    date_fin?: Date | string | null
    nombre_jours?: number | null
  }

  export type demandes_congeUpdateManyMutationInput = {
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    statut_demandes_conge?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_manager?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_rh?: NullableStringFieldUpdateOperationsInput | string | null
    date_demande?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_debut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre_jours?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type demandes_congeUncheckedUpdateManyInput = {
    id_demande_conde?: IntFieldUpdateOperationsInput | number
    id_employe?: IntFieldUpdateOperationsInput | number
    id_type_conge?: IntFieldUpdateOperationsInput | number
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    statut_demandes_conge?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_manager?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_rh?: NullableStringFieldUpdateOperationsInput | string | null
    date_demande?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_debut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre_jours?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type departementCreateInput = {
    nom_departement: string
    manager_departement_id_managerTomanager?: managerCreateNestedOneWithoutDepartement_departement_id_managerTomanagerInput
    employe?: employeCreateNestedManyWithoutDepartementInput
    manager_manager_id_departementTodepartement?: managerCreateNestedManyWithoutDepartement_manager_id_departementTodepartementInput
  }

  export type departementUncheckedCreateInput = {
    id_departement?: number
    nom_departement: string
    id_manager?: number | null
    employe?: employeUncheckedCreateNestedManyWithoutDepartementInput
    manager_manager_id_departementTodepartement?: managerUncheckedCreateNestedManyWithoutDepartement_manager_id_departementTodepartementInput
  }

  export type departementUpdateInput = {
    nom_departement?: StringFieldUpdateOperationsInput | string
    manager_departement_id_managerTomanager?: managerUpdateOneWithoutDepartement_departement_id_managerTomanagerNestedInput
    employe?: employeUpdateManyWithoutDepartementNestedInput
    manager_manager_id_departementTodepartement?: managerUpdateManyWithoutDepartement_manager_id_departementTodepartementNestedInput
  }

  export type departementUncheckedUpdateInput = {
    id_departement?: IntFieldUpdateOperationsInput | number
    nom_departement?: StringFieldUpdateOperationsInput | string
    id_manager?: NullableIntFieldUpdateOperationsInput | number | null
    employe?: employeUncheckedUpdateManyWithoutDepartementNestedInput
    manager_manager_id_departementTodepartement?: managerUncheckedUpdateManyWithoutDepartement_manager_id_departementTodepartementNestedInput
  }

  export type departementCreateManyInput = {
    id_departement?: number
    nom_departement: string
    id_manager?: number | null
  }

  export type departementUpdateManyMutationInput = {
    nom_departement?: StringFieldUpdateOperationsInput | string
  }

  export type departementUncheckedUpdateManyInput = {
    id_departement?: IntFieldUpdateOperationsInput | number
    nom_departement?: StringFieldUpdateOperationsInput | string
    id_manager?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type employeCreateInput = {
    nom_employe: string
    prenom_employe: string
    telephone_employe?: string | null
    adresse_employe?: string | null
    statut_employe?: string | null
    demandes_conge?: demandes_congeCreateNestedManyWithoutEmployeInput
    departement?: departementCreateNestedOneWithoutEmployeInput
    utilisateur?: utilisateurCreateNestedOneWithoutEmployeInput
  }

  export type employeUncheckedCreateInput = {
    id_employe?: number
    nom_employe: string
    prenom_employe: string
    telephone_employe?: string | null
    adresse_employe?: string | null
    statut_employe?: string | null
    id_departement?: number | null
    id_utilisateur?: number | null
    demandes_conge?: demandes_congeUncheckedCreateNestedManyWithoutEmployeInput
  }

  export type employeUpdateInput = {
    nom_employe?: StringFieldUpdateOperationsInput | string
    prenom_employe?: StringFieldUpdateOperationsInput | string
    telephone_employe?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_employe?: NullableStringFieldUpdateOperationsInput | string | null
    statut_employe?: NullableStringFieldUpdateOperationsInput | string | null
    demandes_conge?: demandes_congeUpdateManyWithoutEmployeNestedInput
    departement?: departementUpdateOneWithoutEmployeNestedInput
    utilisateur?: utilisateurUpdateOneWithoutEmployeNestedInput
  }

  export type employeUncheckedUpdateInput = {
    id_employe?: IntFieldUpdateOperationsInput | number
    nom_employe?: StringFieldUpdateOperationsInput | string
    prenom_employe?: StringFieldUpdateOperationsInput | string
    telephone_employe?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_employe?: NullableStringFieldUpdateOperationsInput | string | null
    statut_employe?: NullableStringFieldUpdateOperationsInput | string | null
    id_departement?: NullableIntFieldUpdateOperationsInput | number | null
    id_utilisateur?: NullableIntFieldUpdateOperationsInput | number | null
    demandes_conge?: demandes_congeUncheckedUpdateManyWithoutEmployeNestedInput
  }

  export type employeCreateManyInput = {
    id_employe?: number
    nom_employe: string
    prenom_employe: string
    telephone_employe?: string | null
    adresse_employe?: string | null
    statut_employe?: string | null
    id_departement?: number | null
    id_utilisateur?: number | null
  }

  export type employeUpdateManyMutationInput = {
    nom_employe?: StringFieldUpdateOperationsInput | string
    prenom_employe?: StringFieldUpdateOperationsInput | string
    telephone_employe?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_employe?: NullableStringFieldUpdateOperationsInput | string | null
    statut_employe?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type employeUncheckedUpdateManyInput = {
    id_employe?: IntFieldUpdateOperationsInput | number
    nom_employe?: StringFieldUpdateOperationsInput | string
    prenom_employe?: StringFieldUpdateOperationsInput | string
    telephone_employe?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_employe?: NullableStringFieldUpdateOperationsInput | string | null
    statut_employe?: NullableStringFieldUpdateOperationsInput | string | null
    id_departement?: NullableIntFieldUpdateOperationsInput | number | null
    id_utilisateur?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type jours_feriesCreateInput = {
    nom_jours_feries: string
    date_jours_feries: Date | string
  }

  export type jours_feriesUncheckedCreateInput = {
    id_jours_feries?: number
    nom_jours_feries: string
    date_jours_feries: Date | string
  }

  export type jours_feriesUpdateInput = {
    nom_jours_feries?: StringFieldUpdateOperationsInput | string
    date_jours_feries?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type jours_feriesUncheckedUpdateInput = {
    id_jours_feries?: IntFieldUpdateOperationsInput | number
    nom_jours_feries?: StringFieldUpdateOperationsInput | string
    date_jours_feries?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type jours_feriesCreateManyInput = {
    id_jours_feries?: number
    nom_jours_feries: string
    date_jours_feries: Date | string
  }

  export type jours_feriesUpdateManyMutationInput = {
    nom_jours_feries?: StringFieldUpdateOperationsInput | string
    date_jours_feries?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type jours_feriesUncheckedUpdateManyInput = {
    id_jours_feries?: IntFieldUpdateOperationsInput | number
    nom_jours_feries?: StringFieldUpdateOperationsInput | string
    date_jours_feries?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type managerCreateInput = {
    nom_manager: string
    prenom_manager: string
    telephone_manager?: string | null
    adresse_manager?: string | null
    statut_manager?: string | null
    departement_departement_id_managerTomanager?: departementCreateNestedManyWithoutManager_departement_id_managerTomanagerInput
    departement_manager_id_departementTodepartement?: departementCreateNestedOneWithoutManager_manager_id_departementTodepartementInput
    utilisateur?: utilisateurCreateNestedOneWithoutManagerInput
    types_conge?: types_congeCreateNestedManyWithoutManagerInput
  }

  export type managerUncheckedCreateInput = {
    id_manager?: number
    nom_manager: string
    prenom_manager: string
    telephone_manager?: string | null
    adresse_manager?: string | null
    statut_manager?: string | null
    id_departement?: number | null
    id_utilisateur?: number | null
    departement_departement_id_managerTomanager?: departementUncheckedCreateNestedManyWithoutManager_departement_id_managerTomanagerInput
    types_conge?: types_congeUncheckedCreateNestedManyWithoutManagerInput
  }

  export type managerUpdateInput = {
    nom_manager?: StringFieldUpdateOperationsInput | string
    prenom_manager?: StringFieldUpdateOperationsInput | string
    telephone_manager?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_manager?: NullableStringFieldUpdateOperationsInput | string | null
    statut_manager?: NullableStringFieldUpdateOperationsInput | string | null
    departement_departement_id_managerTomanager?: departementUpdateManyWithoutManager_departement_id_managerTomanagerNestedInput
    departement_manager_id_departementTodepartement?: departementUpdateOneWithoutManager_manager_id_departementTodepartementNestedInput
    utilisateur?: utilisateurUpdateOneWithoutManagerNestedInput
    types_conge?: types_congeUpdateManyWithoutManagerNestedInput
  }

  export type managerUncheckedUpdateInput = {
    id_manager?: IntFieldUpdateOperationsInput | number
    nom_manager?: StringFieldUpdateOperationsInput | string
    prenom_manager?: StringFieldUpdateOperationsInput | string
    telephone_manager?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_manager?: NullableStringFieldUpdateOperationsInput | string | null
    statut_manager?: NullableStringFieldUpdateOperationsInput | string | null
    id_departement?: NullableIntFieldUpdateOperationsInput | number | null
    id_utilisateur?: NullableIntFieldUpdateOperationsInput | number | null
    departement_departement_id_managerTomanager?: departementUncheckedUpdateManyWithoutManager_departement_id_managerTomanagerNestedInput
    types_conge?: types_congeUncheckedUpdateManyWithoutManagerNestedInput
  }

  export type managerCreateManyInput = {
    id_manager?: number
    nom_manager: string
    prenom_manager: string
    telephone_manager?: string | null
    adresse_manager?: string | null
    statut_manager?: string | null
    id_departement?: number | null
    id_utilisateur?: number | null
  }

  export type managerUpdateManyMutationInput = {
    nom_manager?: StringFieldUpdateOperationsInput | string
    prenom_manager?: StringFieldUpdateOperationsInput | string
    telephone_manager?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_manager?: NullableStringFieldUpdateOperationsInput | string | null
    statut_manager?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type managerUncheckedUpdateManyInput = {
    id_manager?: IntFieldUpdateOperationsInput | number
    nom_manager?: StringFieldUpdateOperationsInput | string
    prenom_manager?: StringFieldUpdateOperationsInput | string
    telephone_manager?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_manager?: NullableStringFieldUpdateOperationsInput | string | null
    statut_manager?: NullableStringFieldUpdateOperationsInput | string | null
    id_departement?: NullableIntFieldUpdateOperationsInput | number | null
    id_utilisateur?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type notificationCreateInput = {
    message: string
    statut_notification?: string | null
    date_envoie_notification?: Date | string | null
    utilisateur: utilisateurCreateNestedOneWithoutNotificationInput
  }

  export type notificationUncheckedCreateInput = {
    id_notification?: number
    id_utilisateur: number
    message: string
    statut_notification?: string | null
    date_envoie_notification?: Date | string | null
  }

  export type notificationUpdateInput = {
    message?: StringFieldUpdateOperationsInput | string
    statut_notification?: NullableStringFieldUpdateOperationsInput | string | null
    date_envoie_notification?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utilisateur?: utilisateurUpdateOneRequiredWithoutNotificationNestedInput
  }

  export type notificationUncheckedUpdateInput = {
    id_notification?: IntFieldUpdateOperationsInput | number
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    statut_notification?: NullableStringFieldUpdateOperationsInput | string | null
    date_envoie_notification?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificationCreateManyInput = {
    id_notification?: number
    id_utilisateur: number
    message: string
    statut_notification?: string | null
    date_envoie_notification?: Date | string | null
  }

  export type notificationUpdateManyMutationInput = {
    message?: StringFieldUpdateOperationsInput | string
    statut_notification?: NullableStringFieldUpdateOperationsInput | string | null
    date_envoie_notification?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificationUncheckedUpdateManyInput = {
    id_notification?: IntFieldUpdateOperationsInput | number
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    statut_notification?: NullableStringFieldUpdateOperationsInput | string | null
    date_envoie_notification?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type rhCreateInput = {
    nom_rh: string
    prenom_rh: string
    telephone_rh?: string | null
    adresse_rh?: string | null
    statut_rh?: string | null
    utilisateur?: utilisateurCreateNestedOneWithoutRhInput
  }

  export type rhUncheckedCreateInput = {
    id_rh?: number
    nom_rh: string
    prenom_rh: string
    telephone_rh?: string | null
    adresse_rh?: string | null
    statut_rh?: string | null
    id_utilisateur?: number | null
  }

  export type rhUpdateInput = {
    nom_rh?: StringFieldUpdateOperationsInput | string
    prenom_rh?: StringFieldUpdateOperationsInput | string
    telephone_rh?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_rh?: NullableStringFieldUpdateOperationsInput | string | null
    statut_rh?: NullableStringFieldUpdateOperationsInput | string | null
    utilisateur?: utilisateurUpdateOneWithoutRhNestedInput
  }

  export type rhUncheckedUpdateInput = {
    id_rh?: IntFieldUpdateOperationsInput | number
    nom_rh?: StringFieldUpdateOperationsInput | string
    prenom_rh?: StringFieldUpdateOperationsInput | string
    telephone_rh?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_rh?: NullableStringFieldUpdateOperationsInput | string | null
    statut_rh?: NullableStringFieldUpdateOperationsInput | string | null
    id_utilisateur?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type rhCreateManyInput = {
    id_rh?: number
    nom_rh: string
    prenom_rh: string
    telephone_rh?: string | null
    adresse_rh?: string | null
    statut_rh?: string | null
    id_utilisateur?: number | null
  }

  export type rhUpdateManyMutationInput = {
    nom_rh?: StringFieldUpdateOperationsInput | string
    prenom_rh?: StringFieldUpdateOperationsInput | string
    telephone_rh?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_rh?: NullableStringFieldUpdateOperationsInput | string | null
    statut_rh?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type rhUncheckedUpdateManyInput = {
    id_rh?: IntFieldUpdateOperationsInput | number
    nom_rh?: StringFieldUpdateOperationsInput | string
    prenom_rh?: StringFieldUpdateOperationsInput | string
    telephone_rh?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_rh?: NullableStringFieldUpdateOperationsInput | string | null
    statut_rh?: NullableStringFieldUpdateOperationsInput | string | null
    id_utilisateur?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type types_congeCreateInput = {
    nom_types_conge: string
    statut_types_conge?: string | null
    duree?: number | null
    demandes_conge?: demandes_congeCreateNestedManyWithoutTypes_congeInput
    manager?: managerCreateNestedOneWithoutTypes_congeInput
  }

  export type types_congeUncheckedCreateInput = {
    id_conge?: number
    nom_types_conge: string
    statut_types_conge?: string | null
    id_manager?: number | null
    duree?: number | null
    demandes_conge?: demandes_congeUncheckedCreateNestedManyWithoutTypes_congeInput
  }

  export type types_congeUpdateInput = {
    nom_types_conge?: StringFieldUpdateOperationsInput | string
    statut_types_conge?: NullableStringFieldUpdateOperationsInput | string | null
    duree?: NullableIntFieldUpdateOperationsInput | number | null
    demandes_conge?: demandes_congeUpdateManyWithoutTypes_congeNestedInput
    manager?: managerUpdateOneWithoutTypes_congeNestedInput
  }

  export type types_congeUncheckedUpdateInput = {
    id_conge?: IntFieldUpdateOperationsInput | number
    nom_types_conge?: StringFieldUpdateOperationsInput | string
    statut_types_conge?: NullableStringFieldUpdateOperationsInput | string | null
    id_manager?: NullableIntFieldUpdateOperationsInput | number | null
    duree?: NullableIntFieldUpdateOperationsInput | number | null
    demandes_conge?: demandes_congeUncheckedUpdateManyWithoutTypes_congeNestedInput
  }

  export type types_congeCreateManyInput = {
    id_conge?: number
    nom_types_conge: string
    statut_types_conge?: string | null
    id_manager?: number | null
    duree?: number | null
  }

  export type types_congeUpdateManyMutationInput = {
    nom_types_conge?: StringFieldUpdateOperationsInput | string
    statut_types_conge?: NullableStringFieldUpdateOperationsInput | string | null
    duree?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type types_congeUncheckedUpdateManyInput = {
    id_conge?: IntFieldUpdateOperationsInput | number
    nom_types_conge?: StringFieldUpdateOperationsInput | string
    statut_types_conge?: NullableStringFieldUpdateOperationsInput | string | null
    id_manager?: NullableIntFieldUpdateOperationsInput | number | null
    duree?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type utilisateurCreateInput = {
    nom_utilisateur: string
    prenom: string
    mdp: string
    mail: string
    employe?: employeCreateNestedOneWithoutUtilisateurInput
    manager?: managerCreateNestedOneWithoutUtilisateurInput
    notification?: notificationCreateNestedManyWithoutUtilisateurInput
    rh?: rhCreateNestedOneWithoutUtilisateurInput
  }

  export type utilisateurUncheckedCreateInput = {
    id_utilisateur?: number
    nom_utilisateur: string
    prenom: string
    mdp: string
    mail: string
    employe?: employeUncheckedCreateNestedOneWithoutUtilisateurInput
    manager?: managerUncheckedCreateNestedOneWithoutUtilisateurInput
    notification?: notificationUncheckedCreateNestedManyWithoutUtilisateurInput
    rh?: rhUncheckedCreateNestedOneWithoutUtilisateurInput
  }

  export type utilisateurUpdateInput = {
    nom_utilisateur?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    mdp?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    employe?: employeUpdateOneWithoutUtilisateurNestedInput
    manager?: managerUpdateOneWithoutUtilisateurNestedInput
    notification?: notificationUpdateManyWithoutUtilisateurNestedInput
    rh?: rhUpdateOneWithoutUtilisateurNestedInput
  }

  export type utilisateurUncheckedUpdateInput = {
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    nom_utilisateur?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    mdp?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    employe?: employeUncheckedUpdateOneWithoutUtilisateurNestedInput
    manager?: managerUncheckedUpdateOneWithoutUtilisateurNestedInput
    notification?: notificationUncheckedUpdateManyWithoutUtilisateurNestedInput
    rh?: rhUncheckedUpdateOneWithoutUtilisateurNestedInput
  }

  export type utilisateurCreateManyInput = {
    id_utilisateur?: number
    nom_utilisateur: string
    prenom: string
    mdp: string
    mail: string
  }

  export type utilisateurUpdateManyMutationInput = {
    nom_utilisateur?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    mdp?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
  }

  export type utilisateurUncheckedUpdateManyInput = {
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    nom_utilisateur?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    mdp?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EmployeScalarRelationFilter = {
    is?: employeWhereInput
    isNot?: employeWhereInput
  }

  export type Types_congeScalarRelationFilter = {
    is?: types_congeWhereInput
    isNot?: types_congeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type demandes_congeCountOrderByAggregateInput = {
    id_demande_conde?: SortOrder
    id_employe?: SortOrder
    id_type_conge?: SortOrder
    motif?: SortOrder
    statut_demandes_conge?: SortOrder
    commentaire_manager?: SortOrder
    commentaire_rh?: SortOrder
    date_demande?: SortOrder
    date_debut?: SortOrder
    date_fin?: SortOrder
    nombre_jours?: SortOrder
  }

  export type demandes_congeAvgOrderByAggregateInput = {
    id_demande_conde?: SortOrder
    id_employe?: SortOrder
    id_type_conge?: SortOrder
    nombre_jours?: SortOrder
  }

  export type demandes_congeMaxOrderByAggregateInput = {
    id_demande_conde?: SortOrder
    id_employe?: SortOrder
    id_type_conge?: SortOrder
    motif?: SortOrder
    statut_demandes_conge?: SortOrder
    commentaire_manager?: SortOrder
    commentaire_rh?: SortOrder
    date_demande?: SortOrder
    date_debut?: SortOrder
    date_fin?: SortOrder
    nombre_jours?: SortOrder
  }

  export type demandes_congeMinOrderByAggregateInput = {
    id_demande_conde?: SortOrder
    id_employe?: SortOrder
    id_type_conge?: SortOrder
    motif?: SortOrder
    statut_demandes_conge?: SortOrder
    commentaire_manager?: SortOrder
    commentaire_rh?: SortOrder
    date_demande?: SortOrder
    date_debut?: SortOrder
    date_fin?: SortOrder
    nombre_jours?: SortOrder
  }

  export type demandes_congeSumOrderByAggregateInput = {
    id_demande_conde?: SortOrder
    id_employe?: SortOrder
    id_type_conge?: SortOrder
    nombre_jours?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ManagerNullableScalarRelationFilter = {
    is?: managerWhereInput | null
    isNot?: managerWhereInput | null
  }

  export type EmployeListRelationFilter = {
    every?: employeWhereInput
    some?: employeWhereInput
    none?: employeWhereInput
  }

  export type ManagerListRelationFilter = {
    every?: managerWhereInput
    some?: managerWhereInput
    none?: managerWhereInput
  }

  export type employeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type managerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type departementCountOrderByAggregateInput = {
    id_departement?: SortOrder
    nom_departement?: SortOrder
    id_manager?: SortOrder
  }

  export type departementAvgOrderByAggregateInput = {
    id_departement?: SortOrder
    id_manager?: SortOrder
  }

  export type departementMaxOrderByAggregateInput = {
    id_departement?: SortOrder
    nom_departement?: SortOrder
    id_manager?: SortOrder
  }

  export type departementMinOrderByAggregateInput = {
    id_departement?: SortOrder
    nom_departement?: SortOrder
    id_manager?: SortOrder
  }

  export type departementSumOrderByAggregateInput = {
    id_departement?: SortOrder
    id_manager?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type Demandes_congeListRelationFilter = {
    every?: demandes_congeWhereInput
    some?: demandes_congeWhereInput
    none?: demandes_congeWhereInput
  }

  export type DepartementNullableScalarRelationFilter = {
    is?: departementWhereInput | null
    isNot?: departementWhereInput | null
  }

  export type UtilisateurNullableScalarRelationFilter = {
    is?: utilisateurWhereInput | null
    isNot?: utilisateurWhereInput | null
  }

  export type demandes_congeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type employeCountOrderByAggregateInput = {
    id_employe?: SortOrder
    nom_employe?: SortOrder
    prenom_employe?: SortOrder
    telephone_employe?: SortOrder
    adresse_employe?: SortOrder
    statut_employe?: SortOrder
    id_departement?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type employeAvgOrderByAggregateInput = {
    id_employe?: SortOrder
    id_departement?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type employeMaxOrderByAggregateInput = {
    id_employe?: SortOrder
    nom_employe?: SortOrder
    prenom_employe?: SortOrder
    telephone_employe?: SortOrder
    adresse_employe?: SortOrder
    statut_employe?: SortOrder
    id_departement?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type employeMinOrderByAggregateInput = {
    id_employe?: SortOrder
    nom_employe?: SortOrder
    prenom_employe?: SortOrder
    telephone_employe?: SortOrder
    adresse_employe?: SortOrder
    statut_employe?: SortOrder
    id_departement?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type employeSumOrderByAggregateInput = {
    id_employe?: SortOrder
    id_departement?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type jours_feriesCountOrderByAggregateInput = {
    id_jours_feries?: SortOrder
    nom_jours_feries?: SortOrder
    date_jours_feries?: SortOrder
  }

  export type jours_feriesAvgOrderByAggregateInput = {
    id_jours_feries?: SortOrder
  }

  export type jours_feriesMaxOrderByAggregateInput = {
    id_jours_feries?: SortOrder
    nom_jours_feries?: SortOrder
    date_jours_feries?: SortOrder
  }

  export type jours_feriesMinOrderByAggregateInput = {
    id_jours_feries?: SortOrder
    nom_jours_feries?: SortOrder
    date_jours_feries?: SortOrder
  }

  export type jours_feriesSumOrderByAggregateInput = {
    id_jours_feries?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DepartementListRelationFilter = {
    every?: departementWhereInput
    some?: departementWhereInput
    none?: departementWhereInput
  }

  export type Types_congeListRelationFilter = {
    every?: types_congeWhereInput
    some?: types_congeWhereInput
    none?: types_congeWhereInput
  }

  export type departementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type types_congeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type managerCountOrderByAggregateInput = {
    id_manager?: SortOrder
    nom_manager?: SortOrder
    prenom_manager?: SortOrder
    telephone_manager?: SortOrder
    adresse_manager?: SortOrder
    statut_manager?: SortOrder
    id_departement?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type managerAvgOrderByAggregateInput = {
    id_manager?: SortOrder
    id_departement?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type managerMaxOrderByAggregateInput = {
    id_manager?: SortOrder
    nom_manager?: SortOrder
    prenom_manager?: SortOrder
    telephone_manager?: SortOrder
    adresse_manager?: SortOrder
    statut_manager?: SortOrder
    id_departement?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type managerMinOrderByAggregateInput = {
    id_manager?: SortOrder
    nom_manager?: SortOrder
    prenom_manager?: SortOrder
    telephone_manager?: SortOrder
    adresse_manager?: SortOrder
    statut_manager?: SortOrder
    id_departement?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type managerSumOrderByAggregateInput = {
    id_manager?: SortOrder
    id_departement?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type UtilisateurScalarRelationFilter = {
    is?: utilisateurWhereInput
    isNot?: utilisateurWhereInput
  }

  export type notificationCountOrderByAggregateInput = {
    id_notification?: SortOrder
    id_utilisateur?: SortOrder
    message?: SortOrder
    statut_notification?: SortOrder
    date_envoie_notification?: SortOrder
  }

  export type notificationAvgOrderByAggregateInput = {
    id_notification?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type notificationMaxOrderByAggregateInput = {
    id_notification?: SortOrder
    id_utilisateur?: SortOrder
    message?: SortOrder
    statut_notification?: SortOrder
    date_envoie_notification?: SortOrder
  }

  export type notificationMinOrderByAggregateInput = {
    id_notification?: SortOrder
    id_utilisateur?: SortOrder
    message?: SortOrder
    statut_notification?: SortOrder
    date_envoie_notification?: SortOrder
  }

  export type notificationSumOrderByAggregateInput = {
    id_notification?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type rhCountOrderByAggregateInput = {
    id_rh?: SortOrder
    nom_rh?: SortOrder
    prenom_rh?: SortOrder
    telephone_rh?: SortOrder
    adresse_rh?: SortOrder
    statut_rh?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type rhAvgOrderByAggregateInput = {
    id_rh?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type rhMaxOrderByAggregateInput = {
    id_rh?: SortOrder
    nom_rh?: SortOrder
    prenom_rh?: SortOrder
    telephone_rh?: SortOrder
    adresse_rh?: SortOrder
    statut_rh?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type rhMinOrderByAggregateInput = {
    id_rh?: SortOrder
    nom_rh?: SortOrder
    prenom_rh?: SortOrder
    telephone_rh?: SortOrder
    adresse_rh?: SortOrder
    statut_rh?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type rhSumOrderByAggregateInput = {
    id_rh?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type types_congeCountOrderByAggregateInput = {
    id_conge?: SortOrder
    nom_types_conge?: SortOrder
    statut_types_conge?: SortOrder
    id_manager?: SortOrder
    duree?: SortOrder
  }

  export type types_congeAvgOrderByAggregateInput = {
    id_conge?: SortOrder
    id_manager?: SortOrder
    duree?: SortOrder
  }

  export type types_congeMaxOrderByAggregateInput = {
    id_conge?: SortOrder
    nom_types_conge?: SortOrder
    statut_types_conge?: SortOrder
    id_manager?: SortOrder
    duree?: SortOrder
  }

  export type types_congeMinOrderByAggregateInput = {
    id_conge?: SortOrder
    nom_types_conge?: SortOrder
    statut_types_conge?: SortOrder
    id_manager?: SortOrder
    duree?: SortOrder
  }

  export type types_congeSumOrderByAggregateInput = {
    id_conge?: SortOrder
    id_manager?: SortOrder
    duree?: SortOrder
  }

  export type EmployeNullableScalarRelationFilter = {
    is?: employeWhereInput | null
    isNot?: employeWhereInput | null
  }

  export type NotificationListRelationFilter = {
    every?: notificationWhereInput
    some?: notificationWhereInput
    none?: notificationWhereInput
  }

  export type RhNullableScalarRelationFilter = {
    is?: rhWhereInput | null
    isNot?: rhWhereInput | null
  }

  export type notificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type utilisateurCountOrderByAggregateInput = {
    id_utilisateur?: SortOrder
    nom_utilisateur?: SortOrder
    prenom?: SortOrder
    mdp?: SortOrder
    mail?: SortOrder
  }

  export type utilisateurAvgOrderByAggregateInput = {
    id_utilisateur?: SortOrder
  }

  export type utilisateurMaxOrderByAggregateInput = {
    id_utilisateur?: SortOrder
    nom_utilisateur?: SortOrder
    prenom?: SortOrder
    mdp?: SortOrder
    mail?: SortOrder
  }

  export type utilisateurMinOrderByAggregateInput = {
    id_utilisateur?: SortOrder
    nom_utilisateur?: SortOrder
    prenom?: SortOrder
    mdp?: SortOrder
    mail?: SortOrder
  }

  export type utilisateurSumOrderByAggregateInput = {
    id_utilisateur?: SortOrder
  }

  export type employeCreateNestedOneWithoutDemandes_congeInput = {
    create?: XOR<employeCreateWithoutDemandes_congeInput, employeUncheckedCreateWithoutDemandes_congeInput>
    connectOrCreate?: employeCreateOrConnectWithoutDemandes_congeInput
    connect?: employeWhereUniqueInput
  }

  export type types_congeCreateNestedOneWithoutDemandes_congeInput = {
    create?: XOR<types_congeCreateWithoutDemandes_congeInput, types_congeUncheckedCreateWithoutDemandes_congeInput>
    connectOrCreate?: types_congeCreateOrConnectWithoutDemandes_congeInput
    connect?: types_congeWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type employeUpdateOneRequiredWithoutDemandes_congeNestedInput = {
    create?: XOR<employeCreateWithoutDemandes_congeInput, employeUncheckedCreateWithoutDemandes_congeInput>
    connectOrCreate?: employeCreateOrConnectWithoutDemandes_congeInput
    upsert?: employeUpsertWithoutDemandes_congeInput
    connect?: employeWhereUniqueInput
    update?: XOR<XOR<employeUpdateToOneWithWhereWithoutDemandes_congeInput, employeUpdateWithoutDemandes_congeInput>, employeUncheckedUpdateWithoutDemandes_congeInput>
  }

  export type types_congeUpdateOneRequiredWithoutDemandes_congeNestedInput = {
    create?: XOR<types_congeCreateWithoutDemandes_congeInput, types_congeUncheckedCreateWithoutDemandes_congeInput>
    connectOrCreate?: types_congeCreateOrConnectWithoutDemandes_congeInput
    upsert?: types_congeUpsertWithoutDemandes_congeInput
    connect?: types_congeWhereUniqueInput
    update?: XOR<XOR<types_congeUpdateToOneWithWhereWithoutDemandes_congeInput, types_congeUpdateWithoutDemandes_congeInput>, types_congeUncheckedUpdateWithoutDemandes_congeInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type managerCreateNestedOneWithoutDepartement_departement_id_managerTomanagerInput = {
    create?: XOR<managerCreateWithoutDepartement_departement_id_managerTomanagerInput, managerUncheckedCreateWithoutDepartement_departement_id_managerTomanagerInput>
    connectOrCreate?: managerCreateOrConnectWithoutDepartement_departement_id_managerTomanagerInput
    connect?: managerWhereUniqueInput
  }

  export type employeCreateNestedManyWithoutDepartementInput = {
    create?: XOR<employeCreateWithoutDepartementInput, employeUncheckedCreateWithoutDepartementInput> | employeCreateWithoutDepartementInput[] | employeUncheckedCreateWithoutDepartementInput[]
    connectOrCreate?: employeCreateOrConnectWithoutDepartementInput | employeCreateOrConnectWithoutDepartementInput[]
    createMany?: employeCreateManyDepartementInputEnvelope
    connect?: employeWhereUniqueInput | employeWhereUniqueInput[]
  }

  export type managerCreateNestedManyWithoutDepartement_manager_id_departementTodepartementInput = {
    create?: XOR<managerCreateWithoutDepartement_manager_id_departementTodepartementInput, managerUncheckedCreateWithoutDepartement_manager_id_departementTodepartementInput> | managerCreateWithoutDepartement_manager_id_departementTodepartementInput[] | managerUncheckedCreateWithoutDepartement_manager_id_departementTodepartementInput[]
    connectOrCreate?: managerCreateOrConnectWithoutDepartement_manager_id_departementTodepartementInput | managerCreateOrConnectWithoutDepartement_manager_id_departementTodepartementInput[]
    createMany?: managerCreateManyDepartement_manager_id_departementTodepartementInputEnvelope
    connect?: managerWhereUniqueInput | managerWhereUniqueInput[]
  }

  export type employeUncheckedCreateNestedManyWithoutDepartementInput = {
    create?: XOR<employeCreateWithoutDepartementInput, employeUncheckedCreateWithoutDepartementInput> | employeCreateWithoutDepartementInput[] | employeUncheckedCreateWithoutDepartementInput[]
    connectOrCreate?: employeCreateOrConnectWithoutDepartementInput | employeCreateOrConnectWithoutDepartementInput[]
    createMany?: employeCreateManyDepartementInputEnvelope
    connect?: employeWhereUniqueInput | employeWhereUniqueInput[]
  }

  export type managerUncheckedCreateNestedManyWithoutDepartement_manager_id_departementTodepartementInput = {
    create?: XOR<managerCreateWithoutDepartement_manager_id_departementTodepartementInput, managerUncheckedCreateWithoutDepartement_manager_id_departementTodepartementInput> | managerCreateWithoutDepartement_manager_id_departementTodepartementInput[] | managerUncheckedCreateWithoutDepartement_manager_id_departementTodepartementInput[]
    connectOrCreate?: managerCreateOrConnectWithoutDepartement_manager_id_departementTodepartementInput | managerCreateOrConnectWithoutDepartement_manager_id_departementTodepartementInput[]
    createMany?: managerCreateManyDepartement_manager_id_departementTodepartementInputEnvelope
    connect?: managerWhereUniqueInput | managerWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type managerUpdateOneWithoutDepartement_departement_id_managerTomanagerNestedInput = {
    create?: XOR<managerCreateWithoutDepartement_departement_id_managerTomanagerInput, managerUncheckedCreateWithoutDepartement_departement_id_managerTomanagerInput>
    connectOrCreate?: managerCreateOrConnectWithoutDepartement_departement_id_managerTomanagerInput
    upsert?: managerUpsertWithoutDepartement_departement_id_managerTomanagerInput
    disconnect?: managerWhereInput | boolean
    delete?: managerWhereInput | boolean
    connect?: managerWhereUniqueInput
    update?: XOR<XOR<managerUpdateToOneWithWhereWithoutDepartement_departement_id_managerTomanagerInput, managerUpdateWithoutDepartement_departement_id_managerTomanagerInput>, managerUncheckedUpdateWithoutDepartement_departement_id_managerTomanagerInput>
  }

  export type employeUpdateManyWithoutDepartementNestedInput = {
    create?: XOR<employeCreateWithoutDepartementInput, employeUncheckedCreateWithoutDepartementInput> | employeCreateWithoutDepartementInput[] | employeUncheckedCreateWithoutDepartementInput[]
    connectOrCreate?: employeCreateOrConnectWithoutDepartementInput | employeCreateOrConnectWithoutDepartementInput[]
    upsert?: employeUpsertWithWhereUniqueWithoutDepartementInput | employeUpsertWithWhereUniqueWithoutDepartementInput[]
    createMany?: employeCreateManyDepartementInputEnvelope
    set?: employeWhereUniqueInput | employeWhereUniqueInput[]
    disconnect?: employeWhereUniqueInput | employeWhereUniqueInput[]
    delete?: employeWhereUniqueInput | employeWhereUniqueInput[]
    connect?: employeWhereUniqueInput | employeWhereUniqueInput[]
    update?: employeUpdateWithWhereUniqueWithoutDepartementInput | employeUpdateWithWhereUniqueWithoutDepartementInput[]
    updateMany?: employeUpdateManyWithWhereWithoutDepartementInput | employeUpdateManyWithWhereWithoutDepartementInput[]
    deleteMany?: employeScalarWhereInput | employeScalarWhereInput[]
  }

  export type managerUpdateManyWithoutDepartement_manager_id_departementTodepartementNestedInput = {
    create?: XOR<managerCreateWithoutDepartement_manager_id_departementTodepartementInput, managerUncheckedCreateWithoutDepartement_manager_id_departementTodepartementInput> | managerCreateWithoutDepartement_manager_id_departementTodepartementInput[] | managerUncheckedCreateWithoutDepartement_manager_id_departementTodepartementInput[]
    connectOrCreate?: managerCreateOrConnectWithoutDepartement_manager_id_departementTodepartementInput | managerCreateOrConnectWithoutDepartement_manager_id_departementTodepartementInput[]
    upsert?: managerUpsertWithWhereUniqueWithoutDepartement_manager_id_departementTodepartementInput | managerUpsertWithWhereUniqueWithoutDepartement_manager_id_departementTodepartementInput[]
    createMany?: managerCreateManyDepartement_manager_id_departementTodepartementInputEnvelope
    set?: managerWhereUniqueInput | managerWhereUniqueInput[]
    disconnect?: managerWhereUniqueInput | managerWhereUniqueInput[]
    delete?: managerWhereUniqueInput | managerWhereUniqueInput[]
    connect?: managerWhereUniqueInput | managerWhereUniqueInput[]
    update?: managerUpdateWithWhereUniqueWithoutDepartement_manager_id_departementTodepartementInput | managerUpdateWithWhereUniqueWithoutDepartement_manager_id_departementTodepartementInput[]
    updateMany?: managerUpdateManyWithWhereWithoutDepartement_manager_id_departementTodepartementInput | managerUpdateManyWithWhereWithoutDepartement_manager_id_departementTodepartementInput[]
    deleteMany?: managerScalarWhereInput | managerScalarWhereInput[]
  }

  export type employeUncheckedUpdateManyWithoutDepartementNestedInput = {
    create?: XOR<employeCreateWithoutDepartementInput, employeUncheckedCreateWithoutDepartementInput> | employeCreateWithoutDepartementInput[] | employeUncheckedCreateWithoutDepartementInput[]
    connectOrCreate?: employeCreateOrConnectWithoutDepartementInput | employeCreateOrConnectWithoutDepartementInput[]
    upsert?: employeUpsertWithWhereUniqueWithoutDepartementInput | employeUpsertWithWhereUniqueWithoutDepartementInput[]
    createMany?: employeCreateManyDepartementInputEnvelope
    set?: employeWhereUniqueInput | employeWhereUniqueInput[]
    disconnect?: employeWhereUniqueInput | employeWhereUniqueInput[]
    delete?: employeWhereUniqueInput | employeWhereUniqueInput[]
    connect?: employeWhereUniqueInput | employeWhereUniqueInput[]
    update?: employeUpdateWithWhereUniqueWithoutDepartementInput | employeUpdateWithWhereUniqueWithoutDepartementInput[]
    updateMany?: employeUpdateManyWithWhereWithoutDepartementInput | employeUpdateManyWithWhereWithoutDepartementInput[]
    deleteMany?: employeScalarWhereInput | employeScalarWhereInput[]
  }

  export type managerUncheckedUpdateManyWithoutDepartement_manager_id_departementTodepartementNestedInput = {
    create?: XOR<managerCreateWithoutDepartement_manager_id_departementTodepartementInput, managerUncheckedCreateWithoutDepartement_manager_id_departementTodepartementInput> | managerCreateWithoutDepartement_manager_id_departementTodepartementInput[] | managerUncheckedCreateWithoutDepartement_manager_id_departementTodepartementInput[]
    connectOrCreate?: managerCreateOrConnectWithoutDepartement_manager_id_departementTodepartementInput | managerCreateOrConnectWithoutDepartement_manager_id_departementTodepartementInput[]
    upsert?: managerUpsertWithWhereUniqueWithoutDepartement_manager_id_departementTodepartementInput | managerUpsertWithWhereUniqueWithoutDepartement_manager_id_departementTodepartementInput[]
    createMany?: managerCreateManyDepartement_manager_id_departementTodepartementInputEnvelope
    set?: managerWhereUniqueInput | managerWhereUniqueInput[]
    disconnect?: managerWhereUniqueInput | managerWhereUniqueInput[]
    delete?: managerWhereUniqueInput | managerWhereUniqueInput[]
    connect?: managerWhereUniqueInput | managerWhereUniqueInput[]
    update?: managerUpdateWithWhereUniqueWithoutDepartement_manager_id_departementTodepartementInput | managerUpdateWithWhereUniqueWithoutDepartement_manager_id_departementTodepartementInput[]
    updateMany?: managerUpdateManyWithWhereWithoutDepartement_manager_id_departementTodepartementInput | managerUpdateManyWithWhereWithoutDepartement_manager_id_departementTodepartementInput[]
    deleteMany?: managerScalarWhereInput | managerScalarWhereInput[]
  }

  export type demandes_congeCreateNestedManyWithoutEmployeInput = {
    create?: XOR<demandes_congeCreateWithoutEmployeInput, demandes_congeUncheckedCreateWithoutEmployeInput> | demandes_congeCreateWithoutEmployeInput[] | demandes_congeUncheckedCreateWithoutEmployeInput[]
    connectOrCreate?: demandes_congeCreateOrConnectWithoutEmployeInput | demandes_congeCreateOrConnectWithoutEmployeInput[]
    createMany?: demandes_congeCreateManyEmployeInputEnvelope
    connect?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
  }

  export type departementCreateNestedOneWithoutEmployeInput = {
    create?: XOR<departementCreateWithoutEmployeInput, departementUncheckedCreateWithoutEmployeInput>
    connectOrCreate?: departementCreateOrConnectWithoutEmployeInput
    connect?: departementWhereUniqueInput
  }

  export type utilisateurCreateNestedOneWithoutEmployeInput = {
    create?: XOR<utilisateurCreateWithoutEmployeInput, utilisateurUncheckedCreateWithoutEmployeInput>
    connectOrCreate?: utilisateurCreateOrConnectWithoutEmployeInput
    connect?: utilisateurWhereUniqueInput
  }

  export type demandes_congeUncheckedCreateNestedManyWithoutEmployeInput = {
    create?: XOR<demandes_congeCreateWithoutEmployeInput, demandes_congeUncheckedCreateWithoutEmployeInput> | demandes_congeCreateWithoutEmployeInput[] | demandes_congeUncheckedCreateWithoutEmployeInput[]
    connectOrCreate?: demandes_congeCreateOrConnectWithoutEmployeInput | demandes_congeCreateOrConnectWithoutEmployeInput[]
    createMany?: demandes_congeCreateManyEmployeInputEnvelope
    connect?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
  }

  export type demandes_congeUpdateManyWithoutEmployeNestedInput = {
    create?: XOR<demandes_congeCreateWithoutEmployeInput, demandes_congeUncheckedCreateWithoutEmployeInput> | demandes_congeCreateWithoutEmployeInput[] | demandes_congeUncheckedCreateWithoutEmployeInput[]
    connectOrCreate?: demandes_congeCreateOrConnectWithoutEmployeInput | demandes_congeCreateOrConnectWithoutEmployeInput[]
    upsert?: demandes_congeUpsertWithWhereUniqueWithoutEmployeInput | demandes_congeUpsertWithWhereUniqueWithoutEmployeInput[]
    createMany?: demandes_congeCreateManyEmployeInputEnvelope
    set?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    disconnect?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    delete?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    connect?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    update?: demandes_congeUpdateWithWhereUniqueWithoutEmployeInput | demandes_congeUpdateWithWhereUniqueWithoutEmployeInput[]
    updateMany?: demandes_congeUpdateManyWithWhereWithoutEmployeInput | demandes_congeUpdateManyWithWhereWithoutEmployeInput[]
    deleteMany?: demandes_congeScalarWhereInput | demandes_congeScalarWhereInput[]
  }

  export type departementUpdateOneWithoutEmployeNestedInput = {
    create?: XOR<departementCreateWithoutEmployeInput, departementUncheckedCreateWithoutEmployeInput>
    connectOrCreate?: departementCreateOrConnectWithoutEmployeInput
    upsert?: departementUpsertWithoutEmployeInput
    disconnect?: departementWhereInput | boolean
    delete?: departementWhereInput | boolean
    connect?: departementWhereUniqueInput
    update?: XOR<XOR<departementUpdateToOneWithWhereWithoutEmployeInput, departementUpdateWithoutEmployeInput>, departementUncheckedUpdateWithoutEmployeInput>
  }

  export type utilisateurUpdateOneWithoutEmployeNestedInput = {
    create?: XOR<utilisateurCreateWithoutEmployeInput, utilisateurUncheckedCreateWithoutEmployeInput>
    connectOrCreate?: utilisateurCreateOrConnectWithoutEmployeInput
    upsert?: utilisateurUpsertWithoutEmployeInput
    disconnect?: utilisateurWhereInput | boolean
    delete?: utilisateurWhereInput | boolean
    connect?: utilisateurWhereUniqueInput
    update?: XOR<XOR<utilisateurUpdateToOneWithWhereWithoutEmployeInput, utilisateurUpdateWithoutEmployeInput>, utilisateurUncheckedUpdateWithoutEmployeInput>
  }

  export type demandes_congeUncheckedUpdateManyWithoutEmployeNestedInput = {
    create?: XOR<demandes_congeCreateWithoutEmployeInput, demandes_congeUncheckedCreateWithoutEmployeInput> | demandes_congeCreateWithoutEmployeInput[] | demandes_congeUncheckedCreateWithoutEmployeInput[]
    connectOrCreate?: demandes_congeCreateOrConnectWithoutEmployeInput | demandes_congeCreateOrConnectWithoutEmployeInput[]
    upsert?: demandes_congeUpsertWithWhereUniqueWithoutEmployeInput | demandes_congeUpsertWithWhereUniqueWithoutEmployeInput[]
    createMany?: demandes_congeCreateManyEmployeInputEnvelope
    set?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    disconnect?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    delete?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    connect?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    update?: demandes_congeUpdateWithWhereUniqueWithoutEmployeInput | demandes_congeUpdateWithWhereUniqueWithoutEmployeInput[]
    updateMany?: demandes_congeUpdateManyWithWhereWithoutEmployeInput | demandes_congeUpdateManyWithWhereWithoutEmployeInput[]
    deleteMany?: demandes_congeScalarWhereInput | demandes_congeScalarWhereInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type departementCreateNestedManyWithoutManager_departement_id_managerTomanagerInput = {
    create?: XOR<departementCreateWithoutManager_departement_id_managerTomanagerInput, departementUncheckedCreateWithoutManager_departement_id_managerTomanagerInput> | departementCreateWithoutManager_departement_id_managerTomanagerInput[] | departementUncheckedCreateWithoutManager_departement_id_managerTomanagerInput[]
    connectOrCreate?: departementCreateOrConnectWithoutManager_departement_id_managerTomanagerInput | departementCreateOrConnectWithoutManager_departement_id_managerTomanagerInput[]
    createMany?: departementCreateManyManager_departement_id_managerTomanagerInputEnvelope
    connect?: departementWhereUniqueInput | departementWhereUniqueInput[]
  }

  export type departementCreateNestedOneWithoutManager_manager_id_departementTodepartementInput = {
    create?: XOR<departementCreateWithoutManager_manager_id_departementTodepartementInput, departementUncheckedCreateWithoutManager_manager_id_departementTodepartementInput>
    connectOrCreate?: departementCreateOrConnectWithoutManager_manager_id_departementTodepartementInput
    connect?: departementWhereUniqueInput
  }

  export type utilisateurCreateNestedOneWithoutManagerInput = {
    create?: XOR<utilisateurCreateWithoutManagerInput, utilisateurUncheckedCreateWithoutManagerInput>
    connectOrCreate?: utilisateurCreateOrConnectWithoutManagerInput
    connect?: utilisateurWhereUniqueInput
  }

  export type types_congeCreateNestedManyWithoutManagerInput = {
    create?: XOR<types_congeCreateWithoutManagerInput, types_congeUncheckedCreateWithoutManagerInput> | types_congeCreateWithoutManagerInput[] | types_congeUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: types_congeCreateOrConnectWithoutManagerInput | types_congeCreateOrConnectWithoutManagerInput[]
    createMany?: types_congeCreateManyManagerInputEnvelope
    connect?: types_congeWhereUniqueInput | types_congeWhereUniqueInput[]
  }

  export type departementUncheckedCreateNestedManyWithoutManager_departement_id_managerTomanagerInput = {
    create?: XOR<departementCreateWithoutManager_departement_id_managerTomanagerInput, departementUncheckedCreateWithoutManager_departement_id_managerTomanagerInput> | departementCreateWithoutManager_departement_id_managerTomanagerInput[] | departementUncheckedCreateWithoutManager_departement_id_managerTomanagerInput[]
    connectOrCreate?: departementCreateOrConnectWithoutManager_departement_id_managerTomanagerInput | departementCreateOrConnectWithoutManager_departement_id_managerTomanagerInput[]
    createMany?: departementCreateManyManager_departement_id_managerTomanagerInputEnvelope
    connect?: departementWhereUniqueInput | departementWhereUniqueInput[]
  }

  export type types_congeUncheckedCreateNestedManyWithoutManagerInput = {
    create?: XOR<types_congeCreateWithoutManagerInput, types_congeUncheckedCreateWithoutManagerInput> | types_congeCreateWithoutManagerInput[] | types_congeUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: types_congeCreateOrConnectWithoutManagerInput | types_congeCreateOrConnectWithoutManagerInput[]
    createMany?: types_congeCreateManyManagerInputEnvelope
    connect?: types_congeWhereUniqueInput | types_congeWhereUniqueInput[]
  }

  export type departementUpdateManyWithoutManager_departement_id_managerTomanagerNestedInput = {
    create?: XOR<departementCreateWithoutManager_departement_id_managerTomanagerInput, departementUncheckedCreateWithoutManager_departement_id_managerTomanagerInput> | departementCreateWithoutManager_departement_id_managerTomanagerInput[] | departementUncheckedCreateWithoutManager_departement_id_managerTomanagerInput[]
    connectOrCreate?: departementCreateOrConnectWithoutManager_departement_id_managerTomanagerInput | departementCreateOrConnectWithoutManager_departement_id_managerTomanagerInput[]
    upsert?: departementUpsertWithWhereUniqueWithoutManager_departement_id_managerTomanagerInput | departementUpsertWithWhereUniqueWithoutManager_departement_id_managerTomanagerInput[]
    createMany?: departementCreateManyManager_departement_id_managerTomanagerInputEnvelope
    set?: departementWhereUniqueInput | departementWhereUniqueInput[]
    disconnect?: departementWhereUniqueInput | departementWhereUniqueInput[]
    delete?: departementWhereUniqueInput | departementWhereUniqueInput[]
    connect?: departementWhereUniqueInput | departementWhereUniqueInput[]
    update?: departementUpdateWithWhereUniqueWithoutManager_departement_id_managerTomanagerInput | departementUpdateWithWhereUniqueWithoutManager_departement_id_managerTomanagerInput[]
    updateMany?: departementUpdateManyWithWhereWithoutManager_departement_id_managerTomanagerInput | departementUpdateManyWithWhereWithoutManager_departement_id_managerTomanagerInput[]
    deleteMany?: departementScalarWhereInput | departementScalarWhereInput[]
  }

  export type departementUpdateOneWithoutManager_manager_id_departementTodepartementNestedInput = {
    create?: XOR<departementCreateWithoutManager_manager_id_departementTodepartementInput, departementUncheckedCreateWithoutManager_manager_id_departementTodepartementInput>
    connectOrCreate?: departementCreateOrConnectWithoutManager_manager_id_departementTodepartementInput
    upsert?: departementUpsertWithoutManager_manager_id_departementTodepartementInput
    disconnect?: departementWhereInput | boolean
    delete?: departementWhereInput | boolean
    connect?: departementWhereUniqueInput
    update?: XOR<XOR<departementUpdateToOneWithWhereWithoutManager_manager_id_departementTodepartementInput, departementUpdateWithoutManager_manager_id_departementTodepartementInput>, departementUncheckedUpdateWithoutManager_manager_id_departementTodepartementInput>
  }

  export type utilisateurUpdateOneWithoutManagerNestedInput = {
    create?: XOR<utilisateurCreateWithoutManagerInput, utilisateurUncheckedCreateWithoutManagerInput>
    connectOrCreate?: utilisateurCreateOrConnectWithoutManagerInput
    upsert?: utilisateurUpsertWithoutManagerInput
    disconnect?: utilisateurWhereInput | boolean
    delete?: utilisateurWhereInput | boolean
    connect?: utilisateurWhereUniqueInput
    update?: XOR<XOR<utilisateurUpdateToOneWithWhereWithoutManagerInput, utilisateurUpdateWithoutManagerInput>, utilisateurUncheckedUpdateWithoutManagerInput>
  }

  export type types_congeUpdateManyWithoutManagerNestedInput = {
    create?: XOR<types_congeCreateWithoutManagerInput, types_congeUncheckedCreateWithoutManagerInput> | types_congeCreateWithoutManagerInput[] | types_congeUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: types_congeCreateOrConnectWithoutManagerInput | types_congeCreateOrConnectWithoutManagerInput[]
    upsert?: types_congeUpsertWithWhereUniqueWithoutManagerInput | types_congeUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: types_congeCreateManyManagerInputEnvelope
    set?: types_congeWhereUniqueInput | types_congeWhereUniqueInput[]
    disconnect?: types_congeWhereUniqueInput | types_congeWhereUniqueInput[]
    delete?: types_congeWhereUniqueInput | types_congeWhereUniqueInput[]
    connect?: types_congeWhereUniqueInput | types_congeWhereUniqueInput[]
    update?: types_congeUpdateWithWhereUniqueWithoutManagerInput | types_congeUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: types_congeUpdateManyWithWhereWithoutManagerInput | types_congeUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: types_congeScalarWhereInput | types_congeScalarWhereInput[]
  }

  export type departementUncheckedUpdateManyWithoutManager_departement_id_managerTomanagerNestedInput = {
    create?: XOR<departementCreateWithoutManager_departement_id_managerTomanagerInput, departementUncheckedCreateWithoutManager_departement_id_managerTomanagerInput> | departementCreateWithoutManager_departement_id_managerTomanagerInput[] | departementUncheckedCreateWithoutManager_departement_id_managerTomanagerInput[]
    connectOrCreate?: departementCreateOrConnectWithoutManager_departement_id_managerTomanagerInput | departementCreateOrConnectWithoutManager_departement_id_managerTomanagerInput[]
    upsert?: departementUpsertWithWhereUniqueWithoutManager_departement_id_managerTomanagerInput | departementUpsertWithWhereUniqueWithoutManager_departement_id_managerTomanagerInput[]
    createMany?: departementCreateManyManager_departement_id_managerTomanagerInputEnvelope
    set?: departementWhereUniqueInput | departementWhereUniqueInput[]
    disconnect?: departementWhereUniqueInput | departementWhereUniqueInput[]
    delete?: departementWhereUniqueInput | departementWhereUniqueInput[]
    connect?: departementWhereUniqueInput | departementWhereUniqueInput[]
    update?: departementUpdateWithWhereUniqueWithoutManager_departement_id_managerTomanagerInput | departementUpdateWithWhereUniqueWithoutManager_departement_id_managerTomanagerInput[]
    updateMany?: departementUpdateManyWithWhereWithoutManager_departement_id_managerTomanagerInput | departementUpdateManyWithWhereWithoutManager_departement_id_managerTomanagerInput[]
    deleteMany?: departementScalarWhereInput | departementScalarWhereInput[]
  }

  export type types_congeUncheckedUpdateManyWithoutManagerNestedInput = {
    create?: XOR<types_congeCreateWithoutManagerInput, types_congeUncheckedCreateWithoutManagerInput> | types_congeCreateWithoutManagerInput[] | types_congeUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: types_congeCreateOrConnectWithoutManagerInput | types_congeCreateOrConnectWithoutManagerInput[]
    upsert?: types_congeUpsertWithWhereUniqueWithoutManagerInput | types_congeUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: types_congeCreateManyManagerInputEnvelope
    set?: types_congeWhereUniqueInput | types_congeWhereUniqueInput[]
    disconnect?: types_congeWhereUniqueInput | types_congeWhereUniqueInput[]
    delete?: types_congeWhereUniqueInput | types_congeWhereUniqueInput[]
    connect?: types_congeWhereUniqueInput | types_congeWhereUniqueInput[]
    update?: types_congeUpdateWithWhereUniqueWithoutManagerInput | types_congeUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: types_congeUpdateManyWithWhereWithoutManagerInput | types_congeUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: types_congeScalarWhereInput | types_congeScalarWhereInput[]
  }

  export type utilisateurCreateNestedOneWithoutNotificationInput = {
    create?: XOR<utilisateurCreateWithoutNotificationInput, utilisateurUncheckedCreateWithoutNotificationInput>
    connectOrCreate?: utilisateurCreateOrConnectWithoutNotificationInput
    connect?: utilisateurWhereUniqueInput
  }

  export type utilisateurUpdateOneRequiredWithoutNotificationNestedInput = {
    create?: XOR<utilisateurCreateWithoutNotificationInput, utilisateurUncheckedCreateWithoutNotificationInput>
    connectOrCreate?: utilisateurCreateOrConnectWithoutNotificationInput
    upsert?: utilisateurUpsertWithoutNotificationInput
    connect?: utilisateurWhereUniqueInput
    update?: XOR<XOR<utilisateurUpdateToOneWithWhereWithoutNotificationInput, utilisateurUpdateWithoutNotificationInput>, utilisateurUncheckedUpdateWithoutNotificationInput>
  }

  export type utilisateurCreateNestedOneWithoutRhInput = {
    create?: XOR<utilisateurCreateWithoutRhInput, utilisateurUncheckedCreateWithoutRhInput>
    connectOrCreate?: utilisateurCreateOrConnectWithoutRhInput
    connect?: utilisateurWhereUniqueInput
  }

  export type utilisateurUpdateOneWithoutRhNestedInput = {
    create?: XOR<utilisateurCreateWithoutRhInput, utilisateurUncheckedCreateWithoutRhInput>
    connectOrCreate?: utilisateurCreateOrConnectWithoutRhInput
    upsert?: utilisateurUpsertWithoutRhInput
    disconnect?: utilisateurWhereInput | boolean
    delete?: utilisateurWhereInput | boolean
    connect?: utilisateurWhereUniqueInput
    update?: XOR<XOR<utilisateurUpdateToOneWithWhereWithoutRhInput, utilisateurUpdateWithoutRhInput>, utilisateurUncheckedUpdateWithoutRhInput>
  }

  export type demandes_congeCreateNestedManyWithoutTypes_congeInput = {
    create?: XOR<demandes_congeCreateWithoutTypes_congeInput, demandes_congeUncheckedCreateWithoutTypes_congeInput> | demandes_congeCreateWithoutTypes_congeInput[] | demandes_congeUncheckedCreateWithoutTypes_congeInput[]
    connectOrCreate?: demandes_congeCreateOrConnectWithoutTypes_congeInput | demandes_congeCreateOrConnectWithoutTypes_congeInput[]
    createMany?: demandes_congeCreateManyTypes_congeInputEnvelope
    connect?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
  }

  export type managerCreateNestedOneWithoutTypes_congeInput = {
    create?: XOR<managerCreateWithoutTypes_congeInput, managerUncheckedCreateWithoutTypes_congeInput>
    connectOrCreate?: managerCreateOrConnectWithoutTypes_congeInput
    connect?: managerWhereUniqueInput
  }

  export type demandes_congeUncheckedCreateNestedManyWithoutTypes_congeInput = {
    create?: XOR<demandes_congeCreateWithoutTypes_congeInput, demandes_congeUncheckedCreateWithoutTypes_congeInput> | demandes_congeCreateWithoutTypes_congeInput[] | demandes_congeUncheckedCreateWithoutTypes_congeInput[]
    connectOrCreate?: demandes_congeCreateOrConnectWithoutTypes_congeInput | demandes_congeCreateOrConnectWithoutTypes_congeInput[]
    createMany?: demandes_congeCreateManyTypes_congeInputEnvelope
    connect?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
  }

  export type demandes_congeUpdateManyWithoutTypes_congeNestedInput = {
    create?: XOR<demandes_congeCreateWithoutTypes_congeInput, demandes_congeUncheckedCreateWithoutTypes_congeInput> | demandes_congeCreateWithoutTypes_congeInput[] | demandes_congeUncheckedCreateWithoutTypes_congeInput[]
    connectOrCreate?: demandes_congeCreateOrConnectWithoutTypes_congeInput | demandes_congeCreateOrConnectWithoutTypes_congeInput[]
    upsert?: demandes_congeUpsertWithWhereUniqueWithoutTypes_congeInput | demandes_congeUpsertWithWhereUniqueWithoutTypes_congeInput[]
    createMany?: demandes_congeCreateManyTypes_congeInputEnvelope
    set?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    disconnect?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    delete?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    connect?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    update?: demandes_congeUpdateWithWhereUniqueWithoutTypes_congeInput | demandes_congeUpdateWithWhereUniqueWithoutTypes_congeInput[]
    updateMany?: demandes_congeUpdateManyWithWhereWithoutTypes_congeInput | demandes_congeUpdateManyWithWhereWithoutTypes_congeInput[]
    deleteMany?: demandes_congeScalarWhereInput | demandes_congeScalarWhereInput[]
  }

  export type managerUpdateOneWithoutTypes_congeNestedInput = {
    create?: XOR<managerCreateWithoutTypes_congeInput, managerUncheckedCreateWithoutTypes_congeInput>
    connectOrCreate?: managerCreateOrConnectWithoutTypes_congeInput
    upsert?: managerUpsertWithoutTypes_congeInput
    disconnect?: managerWhereInput | boolean
    delete?: managerWhereInput | boolean
    connect?: managerWhereUniqueInput
    update?: XOR<XOR<managerUpdateToOneWithWhereWithoutTypes_congeInput, managerUpdateWithoutTypes_congeInput>, managerUncheckedUpdateWithoutTypes_congeInput>
  }

  export type demandes_congeUncheckedUpdateManyWithoutTypes_congeNestedInput = {
    create?: XOR<demandes_congeCreateWithoutTypes_congeInput, demandes_congeUncheckedCreateWithoutTypes_congeInput> | demandes_congeCreateWithoutTypes_congeInput[] | demandes_congeUncheckedCreateWithoutTypes_congeInput[]
    connectOrCreate?: demandes_congeCreateOrConnectWithoutTypes_congeInput | demandes_congeCreateOrConnectWithoutTypes_congeInput[]
    upsert?: demandes_congeUpsertWithWhereUniqueWithoutTypes_congeInput | demandes_congeUpsertWithWhereUniqueWithoutTypes_congeInput[]
    createMany?: demandes_congeCreateManyTypes_congeInputEnvelope
    set?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    disconnect?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    delete?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    connect?: demandes_congeWhereUniqueInput | demandes_congeWhereUniqueInput[]
    update?: demandes_congeUpdateWithWhereUniqueWithoutTypes_congeInput | demandes_congeUpdateWithWhereUniqueWithoutTypes_congeInput[]
    updateMany?: demandes_congeUpdateManyWithWhereWithoutTypes_congeInput | demandes_congeUpdateManyWithWhereWithoutTypes_congeInput[]
    deleteMany?: demandes_congeScalarWhereInput | demandes_congeScalarWhereInput[]
  }

  export type employeCreateNestedOneWithoutUtilisateurInput = {
    create?: XOR<employeCreateWithoutUtilisateurInput, employeUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: employeCreateOrConnectWithoutUtilisateurInput
    connect?: employeWhereUniqueInput
  }

  export type managerCreateNestedOneWithoutUtilisateurInput = {
    create?: XOR<managerCreateWithoutUtilisateurInput, managerUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: managerCreateOrConnectWithoutUtilisateurInput
    connect?: managerWhereUniqueInput
  }

  export type notificationCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<notificationCreateWithoutUtilisateurInput, notificationUncheckedCreateWithoutUtilisateurInput> | notificationCreateWithoutUtilisateurInput[] | notificationUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: notificationCreateOrConnectWithoutUtilisateurInput | notificationCreateOrConnectWithoutUtilisateurInput[]
    createMany?: notificationCreateManyUtilisateurInputEnvelope
    connect?: notificationWhereUniqueInput | notificationWhereUniqueInput[]
  }

  export type rhCreateNestedOneWithoutUtilisateurInput = {
    create?: XOR<rhCreateWithoutUtilisateurInput, rhUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: rhCreateOrConnectWithoutUtilisateurInput
    connect?: rhWhereUniqueInput
  }

  export type employeUncheckedCreateNestedOneWithoutUtilisateurInput = {
    create?: XOR<employeCreateWithoutUtilisateurInput, employeUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: employeCreateOrConnectWithoutUtilisateurInput
    connect?: employeWhereUniqueInput
  }

  export type managerUncheckedCreateNestedOneWithoutUtilisateurInput = {
    create?: XOR<managerCreateWithoutUtilisateurInput, managerUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: managerCreateOrConnectWithoutUtilisateurInput
    connect?: managerWhereUniqueInput
  }

  export type notificationUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<notificationCreateWithoutUtilisateurInput, notificationUncheckedCreateWithoutUtilisateurInput> | notificationCreateWithoutUtilisateurInput[] | notificationUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: notificationCreateOrConnectWithoutUtilisateurInput | notificationCreateOrConnectWithoutUtilisateurInput[]
    createMany?: notificationCreateManyUtilisateurInputEnvelope
    connect?: notificationWhereUniqueInput | notificationWhereUniqueInput[]
  }

  export type rhUncheckedCreateNestedOneWithoutUtilisateurInput = {
    create?: XOR<rhCreateWithoutUtilisateurInput, rhUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: rhCreateOrConnectWithoutUtilisateurInput
    connect?: rhWhereUniqueInput
  }

  export type employeUpdateOneWithoutUtilisateurNestedInput = {
    create?: XOR<employeCreateWithoutUtilisateurInput, employeUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: employeCreateOrConnectWithoutUtilisateurInput
    upsert?: employeUpsertWithoutUtilisateurInput
    disconnect?: employeWhereInput | boolean
    delete?: employeWhereInput | boolean
    connect?: employeWhereUniqueInput
    update?: XOR<XOR<employeUpdateToOneWithWhereWithoutUtilisateurInput, employeUpdateWithoutUtilisateurInput>, employeUncheckedUpdateWithoutUtilisateurInput>
  }

  export type managerUpdateOneWithoutUtilisateurNestedInput = {
    create?: XOR<managerCreateWithoutUtilisateurInput, managerUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: managerCreateOrConnectWithoutUtilisateurInput
    upsert?: managerUpsertWithoutUtilisateurInput
    disconnect?: managerWhereInput | boolean
    delete?: managerWhereInput | boolean
    connect?: managerWhereUniqueInput
    update?: XOR<XOR<managerUpdateToOneWithWhereWithoutUtilisateurInput, managerUpdateWithoutUtilisateurInput>, managerUncheckedUpdateWithoutUtilisateurInput>
  }

  export type notificationUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<notificationCreateWithoutUtilisateurInput, notificationUncheckedCreateWithoutUtilisateurInput> | notificationCreateWithoutUtilisateurInput[] | notificationUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: notificationCreateOrConnectWithoutUtilisateurInput | notificationCreateOrConnectWithoutUtilisateurInput[]
    upsert?: notificationUpsertWithWhereUniqueWithoutUtilisateurInput | notificationUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: notificationCreateManyUtilisateurInputEnvelope
    set?: notificationWhereUniqueInput | notificationWhereUniqueInput[]
    disconnect?: notificationWhereUniqueInput | notificationWhereUniqueInput[]
    delete?: notificationWhereUniqueInput | notificationWhereUniqueInput[]
    connect?: notificationWhereUniqueInput | notificationWhereUniqueInput[]
    update?: notificationUpdateWithWhereUniqueWithoutUtilisateurInput | notificationUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: notificationUpdateManyWithWhereWithoutUtilisateurInput | notificationUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: notificationScalarWhereInput | notificationScalarWhereInput[]
  }

  export type rhUpdateOneWithoutUtilisateurNestedInput = {
    create?: XOR<rhCreateWithoutUtilisateurInput, rhUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: rhCreateOrConnectWithoutUtilisateurInput
    upsert?: rhUpsertWithoutUtilisateurInput
    disconnect?: rhWhereInput | boolean
    delete?: rhWhereInput | boolean
    connect?: rhWhereUniqueInput
    update?: XOR<XOR<rhUpdateToOneWithWhereWithoutUtilisateurInput, rhUpdateWithoutUtilisateurInput>, rhUncheckedUpdateWithoutUtilisateurInput>
  }

  export type employeUncheckedUpdateOneWithoutUtilisateurNestedInput = {
    create?: XOR<employeCreateWithoutUtilisateurInput, employeUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: employeCreateOrConnectWithoutUtilisateurInput
    upsert?: employeUpsertWithoutUtilisateurInput
    disconnect?: employeWhereInput | boolean
    delete?: employeWhereInput | boolean
    connect?: employeWhereUniqueInput
    update?: XOR<XOR<employeUpdateToOneWithWhereWithoutUtilisateurInput, employeUpdateWithoutUtilisateurInput>, employeUncheckedUpdateWithoutUtilisateurInput>
  }

  export type managerUncheckedUpdateOneWithoutUtilisateurNestedInput = {
    create?: XOR<managerCreateWithoutUtilisateurInput, managerUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: managerCreateOrConnectWithoutUtilisateurInput
    upsert?: managerUpsertWithoutUtilisateurInput
    disconnect?: managerWhereInput | boolean
    delete?: managerWhereInput | boolean
    connect?: managerWhereUniqueInput
    update?: XOR<XOR<managerUpdateToOneWithWhereWithoutUtilisateurInput, managerUpdateWithoutUtilisateurInput>, managerUncheckedUpdateWithoutUtilisateurInput>
  }

  export type notificationUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<notificationCreateWithoutUtilisateurInput, notificationUncheckedCreateWithoutUtilisateurInput> | notificationCreateWithoutUtilisateurInput[] | notificationUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: notificationCreateOrConnectWithoutUtilisateurInput | notificationCreateOrConnectWithoutUtilisateurInput[]
    upsert?: notificationUpsertWithWhereUniqueWithoutUtilisateurInput | notificationUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: notificationCreateManyUtilisateurInputEnvelope
    set?: notificationWhereUniqueInput | notificationWhereUniqueInput[]
    disconnect?: notificationWhereUniqueInput | notificationWhereUniqueInput[]
    delete?: notificationWhereUniqueInput | notificationWhereUniqueInput[]
    connect?: notificationWhereUniqueInput | notificationWhereUniqueInput[]
    update?: notificationUpdateWithWhereUniqueWithoutUtilisateurInput | notificationUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: notificationUpdateManyWithWhereWithoutUtilisateurInput | notificationUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: notificationScalarWhereInput | notificationScalarWhereInput[]
  }

  export type rhUncheckedUpdateOneWithoutUtilisateurNestedInput = {
    create?: XOR<rhCreateWithoutUtilisateurInput, rhUncheckedCreateWithoutUtilisateurInput>
    connectOrCreate?: rhCreateOrConnectWithoutUtilisateurInput
    upsert?: rhUpsertWithoutUtilisateurInput
    disconnect?: rhWhereInput | boolean
    delete?: rhWhereInput | boolean
    connect?: rhWhereUniqueInput
    update?: XOR<XOR<rhUpdateToOneWithWhereWithoutUtilisateurInput, rhUpdateWithoutUtilisateurInput>, rhUncheckedUpdateWithoutUtilisateurInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type employeCreateWithoutDemandes_congeInput = {
    nom_employe: string
    prenom_employe: string
    telephone_employe?: string | null
    adresse_employe?: string | null
    statut_employe?: string | null
    departement?: departementCreateNestedOneWithoutEmployeInput
    utilisateur?: utilisateurCreateNestedOneWithoutEmployeInput
  }

  export type employeUncheckedCreateWithoutDemandes_congeInput = {
    id_employe?: number
    nom_employe: string
    prenom_employe: string
    telephone_employe?: string | null
    adresse_employe?: string | null
    statut_employe?: string | null
    id_departement?: number | null
    id_utilisateur?: number | null
  }

  export type employeCreateOrConnectWithoutDemandes_congeInput = {
    where: employeWhereUniqueInput
    create: XOR<employeCreateWithoutDemandes_congeInput, employeUncheckedCreateWithoutDemandes_congeInput>
  }

  export type types_congeCreateWithoutDemandes_congeInput = {
    nom_types_conge: string
    statut_types_conge?: string | null
    duree?: number | null
    manager?: managerCreateNestedOneWithoutTypes_congeInput
  }

  export type types_congeUncheckedCreateWithoutDemandes_congeInput = {
    id_conge?: number
    nom_types_conge: string
    statut_types_conge?: string | null
    id_manager?: number | null
    duree?: number | null
  }

  export type types_congeCreateOrConnectWithoutDemandes_congeInput = {
    where: types_congeWhereUniqueInput
    create: XOR<types_congeCreateWithoutDemandes_congeInput, types_congeUncheckedCreateWithoutDemandes_congeInput>
  }

  export type employeUpsertWithoutDemandes_congeInput = {
    update: XOR<employeUpdateWithoutDemandes_congeInput, employeUncheckedUpdateWithoutDemandes_congeInput>
    create: XOR<employeCreateWithoutDemandes_congeInput, employeUncheckedCreateWithoutDemandes_congeInput>
    where?: employeWhereInput
  }

  export type employeUpdateToOneWithWhereWithoutDemandes_congeInput = {
    where?: employeWhereInput
    data: XOR<employeUpdateWithoutDemandes_congeInput, employeUncheckedUpdateWithoutDemandes_congeInput>
  }

  export type employeUpdateWithoutDemandes_congeInput = {
    nom_employe?: StringFieldUpdateOperationsInput | string
    prenom_employe?: StringFieldUpdateOperationsInput | string
    telephone_employe?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_employe?: NullableStringFieldUpdateOperationsInput | string | null
    statut_employe?: NullableStringFieldUpdateOperationsInput | string | null
    departement?: departementUpdateOneWithoutEmployeNestedInput
    utilisateur?: utilisateurUpdateOneWithoutEmployeNestedInput
  }

  export type employeUncheckedUpdateWithoutDemandes_congeInput = {
    id_employe?: IntFieldUpdateOperationsInput | number
    nom_employe?: StringFieldUpdateOperationsInput | string
    prenom_employe?: StringFieldUpdateOperationsInput | string
    telephone_employe?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_employe?: NullableStringFieldUpdateOperationsInput | string | null
    statut_employe?: NullableStringFieldUpdateOperationsInput | string | null
    id_departement?: NullableIntFieldUpdateOperationsInput | number | null
    id_utilisateur?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type types_congeUpsertWithoutDemandes_congeInput = {
    update: XOR<types_congeUpdateWithoutDemandes_congeInput, types_congeUncheckedUpdateWithoutDemandes_congeInput>
    create: XOR<types_congeCreateWithoutDemandes_congeInput, types_congeUncheckedCreateWithoutDemandes_congeInput>
    where?: types_congeWhereInput
  }

  export type types_congeUpdateToOneWithWhereWithoutDemandes_congeInput = {
    where?: types_congeWhereInput
    data: XOR<types_congeUpdateWithoutDemandes_congeInput, types_congeUncheckedUpdateWithoutDemandes_congeInput>
  }

  export type types_congeUpdateWithoutDemandes_congeInput = {
    nom_types_conge?: StringFieldUpdateOperationsInput | string
    statut_types_conge?: NullableStringFieldUpdateOperationsInput | string | null
    duree?: NullableIntFieldUpdateOperationsInput | number | null
    manager?: managerUpdateOneWithoutTypes_congeNestedInput
  }

  export type types_congeUncheckedUpdateWithoutDemandes_congeInput = {
    id_conge?: IntFieldUpdateOperationsInput | number
    nom_types_conge?: StringFieldUpdateOperationsInput | string
    statut_types_conge?: NullableStringFieldUpdateOperationsInput | string | null
    id_manager?: NullableIntFieldUpdateOperationsInput | number | null
    duree?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type managerCreateWithoutDepartement_departement_id_managerTomanagerInput = {
    nom_manager: string
    prenom_manager: string
    telephone_manager?: string | null
    adresse_manager?: string | null
    statut_manager?: string | null
    departement_manager_id_departementTodepartement?: departementCreateNestedOneWithoutManager_manager_id_departementTodepartementInput
    utilisateur?: utilisateurCreateNestedOneWithoutManagerInput
    types_conge?: types_congeCreateNestedManyWithoutManagerInput
  }

  export type managerUncheckedCreateWithoutDepartement_departement_id_managerTomanagerInput = {
    id_manager?: number
    nom_manager: string
    prenom_manager: string
    telephone_manager?: string | null
    adresse_manager?: string | null
    statut_manager?: string | null
    id_departement?: number | null
    id_utilisateur?: number | null
    types_conge?: types_congeUncheckedCreateNestedManyWithoutManagerInput
  }

  export type managerCreateOrConnectWithoutDepartement_departement_id_managerTomanagerInput = {
    where: managerWhereUniqueInput
    create: XOR<managerCreateWithoutDepartement_departement_id_managerTomanagerInput, managerUncheckedCreateWithoutDepartement_departement_id_managerTomanagerInput>
  }

  export type employeCreateWithoutDepartementInput = {
    nom_employe: string
    prenom_employe: string
    telephone_employe?: string | null
    adresse_employe?: string | null
    statut_employe?: string | null
    demandes_conge?: demandes_congeCreateNestedManyWithoutEmployeInput
    utilisateur?: utilisateurCreateNestedOneWithoutEmployeInput
  }

  export type employeUncheckedCreateWithoutDepartementInput = {
    id_employe?: number
    nom_employe: string
    prenom_employe: string
    telephone_employe?: string | null
    adresse_employe?: string | null
    statut_employe?: string | null
    id_utilisateur?: number | null
    demandes_conge?: demandes_congeUncheckedCreateNestedManyWithoutEmployeInput
  }

  export type employeCreateOrConnectWithoutDepartementInput = {
    where: employeWhereUniqueInput
    create: XOR<employeCreateWithoutDepartementInput, employeUncheckedCreateWithoutDepartementInput>
  }

  export type employeCreateManyDepartementInputEnvelope = {
    data: employeCreateManyDepartementInput | employeCreateManyDepartementInput[]
    skipDuplicates?: boolean
  }

  export type managerCreateWithoutDepartement_manager_id_departementTodepartementInput = {
    nom_manager: string
    prenom_manager: string
    telephone_manager?: string | null
    adresse_manager?: string | null
    statut_manager?: string | null
    departement_departement_id_managerTomanager?: departementCreateNestedManyWithoutManager_departement_id_managerTomanagerInput
    utilisateur?: utilisateurCreateNestedOneWithoutManagerInput
    types_conge?: types_congeCreateNestedManyWithoutManagerInput
  }

  export type managerUncheckedCreateWithoutDepartement_manager_id_departementTodepartementInput = {
    id_manager?: number
    nom_manager: string
    prenom_manager: string
    telephone_manager?: string | null
    adresse_manager?: string | null
    statut_manager?: string | null
    id_utilisateur?: number | null
    departement_departement_id_managerTomanager?: departementUncheckedCreateNestedManyWithoutManager_departement_id_managerTomanagerInput
    types_conge?: types_congeUncheckedCreateNestedManyWithoutManagerInput
  }

  export type managerCreateOrConnectWithoutDepartement_manager_id_departementTodepartementInput = {
    where: managerWhereUniqueInput
    create: XOR<managerCreateWithoutDepartement_manager_id_departementTodepartementInput, managerUncheckedCreateWithoutDepartement_manager_id_departementTodepartementInput>
  }

  export type managerCreateManyDepartement_manager_id_departementTodepartementInputEnvelope = {
    data: managerCreateManyDepartement_manager_id_departementTodepartementInput | managerCreateManyDepartement_manager_id_departementTodepartementInput[]
    skipDuplicates?: boolean
  }

  export type managerUpsertWithoutDepartement_departement_id_managerTomanagerInput = {
    update: XOR<managerUpdateWithoutDepartement_departement_id_managerTomanagerInput, managerUncheckedUpdateWithoutDepartement_departement_id_managerTomanagerInput>
    create: XOR<managerCreateWithoutDepartement_departement_id_managerTomanagerInput, managerUncheckedCreateWithoutDepartement_departement_id_managerTomanagerInput>
    where?: managerWhereInput
  }

  export type managerUpdateToOneWithWhereWithoutDepartement_departement_id_managerTomanagerInput = {
    where?: managerWhereInput
    data: XOR<managerUpdateWithoutDepartement_departement_id_managerTomanagerInput, managerUncheckedUpdateWithoutDepartement_departement_id_managerTomanagerInput>
  }

  export type managerUpdateWithoutDepartement_departement_id_managerTomanagerInput = {
    nom_manager?: StringFieldUpdateOperationsInput | string
    prenom_manager?: StringFieldUpdateOperationsInput | string
    telephone_manager?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_manager?: NullableStringFieldUpdateOperationsInput | string | null
    statut_manager?: NullableStringFieldUpdateOperationsInput | string | null
    departement_manager_id_departementTodepartement?: departementUpdateOneWithoutManager_manager_id_departementTodepartementNestedInput
    utilisateur?: utilisateurUpdateOneWithoutManagerNestedInput
    types_conge?: types_congeUpdateManyWithoutManagerNestedInput
  }

  export type managerUncheckedUpdateWithoutDepartement_departement_id_managerTomanagerInput = {
    id_manager?: IntFieldUpdateOperationsInput | number
    nom_manager?: StringFieldUpdateOperationsInput | string
    prenom_manager?: StringFieldUpdateOperationsInput | string
    telephone_manager?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_manager?: NullableStringFieldUpdateOperationsInput | string | null
    statut_manager?: NullableStringFieldUpdateOperationsInput | string | null
    id_departement?: NullableIntFieldUpdateOperationsInput | number | null
    id_utilisateur?: NullableIntFieldUpdateOperationsInput | number | null
    types_conge?: types_congeUncheckedUpdateManyWithoutManagerNestedInput
  }

  export type employeUpsertWithWhereUniqueWithoutDepartementInput = {
    where: employeWhereUniqueInput
    update: XOR<employeUpdateWithoutDepartementInput, employeUncheckedUpdateWithoutDepartementInput>
    create: XOR<employeCreateWithoutDepartementInput, employeUncheckedCreateWithoutDepartementInput>
  }

  export type employeUpdateWithWhereUniqueWithoutDepartementInput = {
    where: employeWhereUniqueInput
    data: XOR<employeUpdateWithoutDepartementInput, employeUncheckedUpdateWithoutDepartementInput>
  }

  export type employeUpdateManyWithWhereWithoutDepartementInput = {
    where: employeScalarWhereInput
    data: XOR<employeUpdateManyMutationInput, employeUncheckedUpdateManyWithoutDepartementInput>
  }

  export type employeScalarWhereInput = {
    AND?: employeScalarWhereInput | employeScalarWhereInput[]
    OR?: employeScalarWhereInput[]
    NOT?: employeScalarWhereInput | employeScalarWhereInput[]
    id_employe?: IntFilter<"employe"> | number
    nom_employe?: StringFilter<"employe"> | string
    prenom_employe?: StringFilter<"employe"> | string
    telephone_employe?: StringNullableFilter<"employe"> | string | null
    adresse_employe?: StringNullableFilter<"employe"> | string | null
    statut_employe?: StringNullableFilter<"employe"> | string | null
    id_departement?: IntNullableFilter<"employe"> | number | null
    id_utilisateur?: IntNullableFilter<"employe"> | number | null
  }

  export type managerUpsertWithWhereUniqueWithoutDepartement_manager_id_departementTodepartementInput = {
    where: managerWhereUniqueInput
    update: XOR<managerUpdateWithoutDepartement_manager_id_departementTodepartementInput, managerUncheckedUpdateWithoutDepartement_manager_id_departementTodepartementInput>
    create: XOR<managerCreateWithoutDepartement_manager_id_departementTodepartementInput, managerUncheckedCreateWithoutDepartement_manager_id_departementTodepartementInput>
  }

  export type managerUpdateWithWhereUniqueWithoutDepartement_manager_id_departementTodepartementInput = {
    where: managerWhereUniqueInput
    data: XOR<managerUpdateWithoutDepartement_manager_id_departementTodepartementInput, managerUncheckedUpdateWithoutDepartement_manager_id_departementTodepartementInput>
  }

  export type managerUpdateManyWithWhereWithoutDepartement_manager_id_departementTodepartementInput = {
    where: managerScalarWhereInput
    data: XOR<managerUpdateManyMutationInput, managerUncheckedUpdateManyWithoutDepartement_manager_id_departementTodepartementInput>
  }

  export type managerScalarWhereInput = {
    AND?: managerScalarWhereInput | managerScalarWhereInput[]
    OR?: managerScalarWhereInput[]
    NOT?: managerScalarWhereInput | managerScalarWhereInput[]
    id_manager?: IntFilter<"manager"> | number
    nom_manager?: StringFilter<"manager"> | string
    prenom_manager?: StringFilter<"manager"> | string
    telephone_manager?: StringNullableFilter<"manager"> | string | null
    adresse_manager?: StringNullableFilter<"manager"> | string | null
    statut_manager?: StringNullableFilter<"manager"> | string | null
    id_departement?: IntNullableFilter<"manager"> | number | null
    id_utilisateur?: IntNullableFilter<"manager"> | number | null
  }

  export type demandes_congeCreateWithoutEmployeInput = {
    motif?: string | null
    statut_demandes_conge?: string | null
    commentaire_manager?: string | null
    commentaire_rh?: string | null
    date_demande?: Date | string | null
    date_debut?: Date | string | null
    date_fin?: Date | string | null
    nombre_jours?: number | null
    types_conge: types_congeCreateNestedOneWithoutDemandes_congeInput
  }

  export type demandes_congeUncheckedCreateWithoutEmployeInput = {
    id_demande_conde?: number
    id_type_conge: number
    motif?: string | null
    statut_demandes_conge?: string | null
    commentaire_manager?: string | null
    commentaire_rh?: string | null
    date_demande?: Date | string | null
    date_debut?: Date | string | null
    date_fin?: Date | string | null
    nombre_jours?: number | null
  }

  export type demandes_congeCreateOrConnectWithoutEmployeInput = {
    where: demandes_congeWhereUniqueInput
    create: XOR<demandes_congeCreateWithoutEmployeInput, demandes_congeUncheckedCreateWithoutEmployeInput>
  }

  export type demandes_congeCreateManyEmployeInputEnvelope = {
    data: demandes_congeCreateManyEmployeInput | demandes_congeCreateManyEmployeInput[]
    skipDuplicates?: boolean
  }

  export type departementCreateWithoutEmployeInput = {
    nom_departement: string
    manager_departement_id_managerTomanager?: managerCreateNestedOneWithoutDepartement_departement_id_managerTomanagerInput
    manager_manager_id_departementTodepartement?: managerCreateNestedManyWithoutDepartement_manager_id_departementTodepartementInput
  }

  export type departementUncheckedCreateWithoutEmployeInput = {
    id_departement?: number
    nom_departement: string
    id_manager?: number | null
    manager_manager_id_departementTodepartement?: managerUncheckedCreateNestedManyWithoutDepartement_manager_id_departementTodepartementInput
  }

  export type departementCreateOrConnectWithoutEmployeInput = {
    where: departementWhereUniqueInput
    create: XOR<departementCreateWithoutEmployeInput, departementUncheckedCreateWithoutEmployeInput>
  }

  export type utilisateurCreateWithoutEmployeInput = {
    nom_utilisateur: string
    prenom: string
    mdp: string
    mail: string
    manager?: managerCreateNestedOneWithoutUtilisateurInput
    notification?: notificationCreateNestedManyWithoutUtilisateurInput
    rh?: rhCreateNestedOneWithoutUtilisateurInput
  }

  export type utilisateurUncheckedCreateWithoutEmployeInput = {
    id_utilisateur?: number
    nom_utilisateur: string
    prenom: string
    mdp: string
    mail: string
    manager?: managerUncheckedCreateNestedOneWithoutUtilisateurInput
    notification?: notificationUncheckedCreateNestedManyWithoutUtilisateurInput
    rh?: rhUncheckedCreateNestedOneWithoutUtilisateurInput
  }

  export type utilisateurCreateOrConnectWithoutEmployeInput = {
    where: utilisateurWhereUniqueInput
    create: XOR<utilisateurCreateWithoutEmployeInput, utilisateurUncheckedCreateWithoutEmployeInput>
  }

  export type demandes_congeUpsertWithWhereUniqueWithoutEmployeInput = {
    where: demandes_congeWhereUniqueInput
    update: XOR<demandes_congeUpdateWithoutEmployeInput, demandes_congeUncheckedUpdateWithoutEmployeInput>
    create: XOR<demandes_congeCreateWithoutEmployeInput, demandes_congeUncheckedCreateWithoutEmployeInput>
  }

  export type demandes_congeUpdateWithWhereUniqueWithoutEmployeInput = {
    where: demandes_congeWhereUniqueInput
    data: XOR<demandes_congeUpdateWithoutEmployeInput, demandes_congeUncheckedUpdateWithoutEmployeInput>
  }

  export type demandes_congeUpdateManyWithWhereWithoutEmployeInput = {
    where: demandes_congeScalarWhereInput
    data: XOR<demandes_congeUpdateManyMutationInput, demandes_congeUncheckedUpdateManyWithoutEmployeInput>
  }

  export type demandes_congeScalarWhereInput = {
    AND?: demandes_congeScalarWhereInput | demandes_congeScalarWhereInput[]
    OR?: demandes_congeScalarWhereInput[]
    NOT?: demandes_congeScalarWhereInput | demandes_congeScalarWhereInput[]
    id_demande_conde?: IntFilter<"demandes_conge"> | number
    id_employe?: IntFilter<"demandes_conge"> | number
    id_type_conge?: IntFilter<"demandes_conge"> | number
    motif?: StringNullableFilter<"demandes_conge"> | string | null
    statut_demandes_conge?: StringNullableFilter<"demandes_conge"> | string | null
    commentaire_manager?: StringNullableFilter<"demandes_conge"> | string | null
    commentaire_rh?: StringNullableFilter<"demandes_conge"> | string | null
    date_demande?: DateTimeNullableFilter<"demandes_conge"> | Date | string | null
    date_debut?: DateTimeNullableFilter<"demandes_conge"> | Date | string | null
    date_fin?: DateTimeNullableFilter<"demandes_conge"> | Date | string | null
    nombre_jours?: IntNullableFilter<"demandes_conge"> | number | null
  }

  export type departementUpsertWithoutEmployeInput = {
    update: XOR<departementUpdateWithoutEmployeInput, departementUncheckedUpdateWithoutEmployeInput>
    create: XOR<departementCreateWithoutEmployeInput, departementUncheckedCreateWithoutEmployeInput>
    where?: departementWhereInput
  }

  export type departementUpdateToOneWithWhereWithoutEmployeInput = {
    where?: departementWhereInput
    data: XOR<departementUpdateWithoutEmployeInput, departementUncheckedUpdateWithoutEmployeInput>
  }

  export type departementUpdateWithoutEmployeInput = {
    nom_departement?: StringFieldUpdateOperationsInput | string
    manager_departement_id_managerTomanager?: managerUpdateOneWithoutDepartement_departement_id_managerTomanagerNestedInput
    manager_manager_id_departementTodepartement?: managerUpdateManyWithoutDepartement_manager_id_departementTodepartementNestedInput
  }

  export type departementUncheckedUpdateWithoutEmployeInput = {
    id_departement?: IntFieldUpdateOperationsInput | number
    nom_departement?: StringFieldUpdateOperationsInput | string
    id_manager?: NullableIntFieldUpdateOperationsInput | number | null
    manager_manager_id_departementTodepartement?: managerUncheckedUpdateManyWithoutDepartement_manager_id_departementTodepartementNestedInput
  }

  export type utilisateurUpsertWithoutEmployeInput = {
    update: XOR<utilisateurUpdateWithoutEmployeInput, utilisateurUncheckedUpdateWithoutEmployeInput>
    create: XOR<utilisateurCreateWithoutEmployeInput, utilisateurUncheckedCreateWithoutEmployeInput>
    where?: utilisateurWhereInput
  }

  export type utilisateurUpdateToOneWithWhereWithoutEmployeInput = {
    where?: utilisateurWhereInput
    data: XOR<utilisateurUpdateWithoutEmployeInput, utilisateurUncheckedUpdateWithoutEmployeInput>
  }

  export type utilisateurUpdateWithoutEmployeInput = {
    nom_utilisateur?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    mdp?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    manager?: managerUpdateOneWithoutUtilisateurNestedInput
    notification?: notificationUpdateManyWithoutUtilisateurNestedInput
    rh?: rhUpdateOneWithoutUtilisateurNestedInput
  }

  export type utilisateurUncheckedUpdateWithoutEmployeInput = {
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    nom_utilisateur?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    mdp?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    manager?: managerUncheckedUpdateOneWithoutUtilisateurNestedInput
    notification?: notificationUncheckedUpdateManyWithoutUtilisateurNestedInput
    rh?: rhUncheckedUpdateOneWithoutUtilisateurNestedInput
  }

  export type departementCreateWithoutManager_departement_id_managerTomanagerInput = {
    nom_departement: string
    employe?: employeCreateNestedManyWithoutDepartementInput
    manager_manager_id_departementTodepartement?: managerCreateNestedManyWithoutDepartement_manager_id_departementTodepartementInput
  }

  export type departementUncheckedCreateWithoutManager_departement_id_managerTomanagerInput = {
    id_departement?: number
    nom_departement: string
    employe?: employeUncheckedCreateNestedManyWithoutDepartementInput
    manager_manager_id_departementTodepartement?: managerUncheckedCreateNestedManyWithoutDepartement_manager_id_departementTodepartementInput
  }

  export type departementCreateOrConnectWithoutManager_departement_id_managerTomanagerInput = {
    where: departementWhereUniqueInput
    create: XOR<departementCreateWithoutManager_departement_id_managerTomanagerInput, departementUncheckedCreateWithoutManager_departement_id_managerTomanagerInput>
  }

  export type departementCreateManyManager_departement_id_managerTomanagerInputEnvelope = {
    data: departementCreateManyManager_departement_id_managerTomanagerInput | departementCreateManyManager_departement_id_managerTomanagerInput[]
    skipDuplicates?: boolean
  }

  export type departementCreateWithoutManager_manager_id_departementTodepartementInput = {
    nom_departement: string
    manager_departement_id_managerTomanager?: managerCreateNestedOneWithoutDepartement_departement_id_managerTomanagerInput
    employe?: employeCreateNestedManyWithoutDepartementInput
  }

  export type departementUncheckedCreateWithoutManager_manager_id_departementTodepartementInput = {
    id_departement?: number
    nom_departement: string
    id_manager?: number | null
    employe?: employeUncheckedCreateNestedManyWithoutDepartementInput
  }

  export type departementCreateOrConnectWithoutManager_manager_id_departementTodepartementInput = {
    where: departementWhereUniqueInput
    create: XOR<departementCreateWithoutManager_manager_id_departementTodepartementInput, departementUncheckedCreateWithoutManager_manager_id_departementTodepartementInput>
  }

  export type utilisateurCreateWithoutManagerInput = {
    nom_utilisateur: string
    prenom: string
    mdp: string
    mail: string
    employe?: employeCreateNestedOneWithoutUtilisateurInput
    notification?: notificationCreateNestedManyWithoutUtilisateurInput
    rh?: rhCreateNestedOneWithoutUtilisateurInput
  }

  export type utilisateurUncheckedCreateWithoutManagerInput = {
    id_utilisateur?: number
    nom_utilisateur: string
    prenom: string
    mdp: string
    mail: string
    employe?: employeUncheckedCreateNestedOneWithoutUtilisateurInput
    notification?: notificationUncheckedCreateNestedManyWithoutUtilisateurInput
    rh?: rhUncheckedCreateNestedOneWithoutUtilisateurInput
  }

  export type utilisateurCreateOrConnectWithoutManagerInput = {
    where: utilisateurWhereUniqueInput
    create: XOR<utilisateurCreateWithoutManagerInput, utilisateurUncheckedCreateWithoutManagerInput>
  }

  export type types_congeCreateWithoutManagerInput = {
    nom_types_conge: string
    statut_types_conge?: string | null
    duree?: number | null
    demandes_conge?: demandes_congeCreateNestedManyWithoutTypes_congeInput
  }

  export type types_congeUncheckedCreateWithoutManagerInput = {
    id_conge?: number
    nom_types_conge: string
    statut_types_conge?: string | null
    duree?: number | null
    demandes_conge?: demandes_congeUncheckedCreateNestedManyWithoutTypes_congeInput
  }

  export type types_congeCreateOrConnectWithoutManagerInput = {
    where: types_congeWhereUniqueInput
    create: XOR<types_congeCreateWithoutManagerInput, types_congeUncheckedCreateWithoutManagerInput>
  }

  export type types_congeCreateManyManagerInputEnvelope = {
    data: types_congeCreateManyManagerInput | types_congeCreateManyManagerInput[]
    skipDuplicates?: boolean
  }

  export type departementUpsertWithWhereUniqueWithoutManager_departement_id_managerTomanagerInput = {
    where: departementWhereUniqueInput
    update: XOR<departementUpdateWithoutManager_departement_id_managerTomanagerInput, departementUncheckedUpdateWithoutManager_departement_id_managerTomanagerInput>
    create: XOR<departementCreateWithoutManager_departement_id_managerTomanagerInput, departementUncheckedCreateWithoutManager_departement_id_managerTomanagerInput>
  }

  export type departementUpdateWithWhereUniqueWithoutManager_departement_id_managerTomanagerInput = {
    where: departementWhereUniqueInput
    data: XOR<departementUpdateWithoutManager_departement_id_managerTomanagerInput, departementUncheckedUpdateWithoutManager_departement_id_managerTomanagerInput>
  }

  export type departementUpdateManyWithWhereWithoutManager_departement_id_managerTomanagerInput = {
    where: departementScalarWhereInput
    data: XOR<departementUpdateManyMutationInput, departementUncheckedUpdateManyWithoutManager_departement_id_managerTomanagerInput>
  }

  export type departementScalarWhereInput = {
    AND?: departementScalarWhereInput | departementScalarWhereInput[]
    OR?: departementScalarWhereInput[]
    NOT?: departementScalarWhereInput | departementScalarWhereInput[]
    id_departement?: IntFilter<"departement"> | number
    nom_departement?: StringFilter<"departement"> | string
    id_manager?: IntNullableFilter<"departement"> | number | null
  }

  export type departementUpsertWithoutManager_manager_id_departementTodepartementInput = {
    update: XOR<departementUpdateWithoutManager_manager_id_departementTodepartementInput, departementUncheckedUpdateWithoutManager_manager_id_departementTodepartementInput>
    create: XOR<departementCreateWithoutManager_manager_id_departementTodepartementInput, departementUncheckedCreateWithoutManager_manager_id_departementTodepartementInput>
    where?: departementWhereInput
  }

  export type departementUpdateToOneWithWhereWithoutManager_manager_id_departementTodepartementInput = {
    where?: departementWhereInput
    data: XOR<departementUpdateWithoutManager_manager_id_departementTodepartementInput, departementUncheckedUpdateWithoutManager_manager_id_departementTodepartementInput>
  }

  export type departementUpdateWithoutManager_manager_id_departementTodepartementInput = {
    nom_departement?: StringFieldUpdateOperationsInput | string
    manager_departement_id_managerTomanager?: managerUpdateOneWithoutDepartement_departement_id_managerTomanagerNestedInput
    employe?: employeUpdateManyWithoutDepartementNestedInput
  }

  export type departementUncheckedUpdateWithoutManager_manager_id_departementTodepartementInput = {
    id_departement?: IntFieldUpdateOperationsInput | number
    nom_departement?: StringFieldUpdateOperationsInput | string
    id_manager?: NullableIntFieldUpdateOperationsInput | number | null
    employe?: employeUncheckedUpdateManyWithoutDepartementNestedInput
  }

  export type utilisateurUpsertWithoutManagerInput = {
    update: XOR<utilisateurUpdateWithoutManagerInput, utilisateurUncheckedUpdateWithoutManagerInput>
    create: XOR<utilisateurCreateWithoutManagerInput, utilisateurUncheckedCreateWithoutManagerInput>
    where?: utilisateurWhereInput
  }

  export type utilisateurUpdateToOneWithWhereWithoutManagerInput = {
    where?: utilisateurWhereInput
    data: XOR<utilisateurUpdateWithoutManagerInput, utilisateurUncheckedUpdateWithoutManagerInput>
  }

  export type utilisateurUpdateWithoutManagerInput = {
    nom_utilisateur?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    mdp?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    employe?: employeUpdateOneWithoutUtilisateurNestedInput
    notification?: notificationUpdateManyWithoutUtilisateurNestedInput
    rh?: rhUpdateOneWithoutUtilisateurNestedInput
  }

  export type utilisateurUncheckedUpdateWithoutManagerInput = {
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    nom_utilisateur?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    mdp?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    employe?: employeUncheckedUpdateOneWithoutUtilisateurNestedInput
    notification?: notificationUncheckedUpdateManyWithoutUtilisateurNestedInput
    rh?: rhUncheckedUpdateOneWithoutUtilisateurNestedInput
  }

  export type types_congeUpsertWithWhereUniqueWithoutManagerInput = {
    where: types_congeWhereUniqueInput
    update: XOR<types_congeUpdateWithoutManagerInput, types_congeUncheckedUpdateWithoutManagerInput>
    create: XOR<types_congeCreateWithoutManagerInput, types_congeUncheckedCreateWithoutManagerInput>
  }

  export type types_congeUpdateWithWhereUniqueWithoutManagerInput = {
    where: types_congeWhereUniqueInput
    data: XOR<types_congeUpdateWithoutManagerInput, types_congeUncheckedUpdateWithoutManagerInput>
  }

  export type types_congeUpdateManyWithWhereWithoutManagerInput = {
    where: types_congeScalarWhereInput
    data: XOR<types_congeUpdateManyMutationInput, types_congeUncheckedUpdateManyWithoutManagerInput>
  }

  export type types_congeScalarWhereInput = {
    AND?: types_congeScalarWhereInput | types_congeScalarWhereInput[]
    OR?: types_congeScalarWhereInput[]
    NOT?: types_congeScalarWhereInput | types_congeScalarWhereInput[]
    id_conge?: IntFilter<"types_conge"> | number
    nom_types_conge?: StringFilter<"types_conge"> | string
    statut_types_conge?: StringNullableFilter<"types_conge"> | string | null
    id_manager?: IntNullableFilter<"types_conge"> | number | null
    duree?: IntNullableFilter<"types_conge"> | number | null
  }

  export type utilisateurCreateWithoutNotificationInput = {
    nom_utilisateur: string
    prenom: string
    mdp: string
    mail: string
    employe?: employeCreateNestedOneWithoutUtilisateurInput
    manager?: managerCreateNestedOneWithoutUtilisateurInput
    rh?: rhCreateNestedOneWithoutUtilisateurInput
  }

  export type utilisateurUncheckedCreateWithoutNotificationInput = {
    id_utilisateur?: number
    nom_utilisateur: string
    prenom: string
    mdp: string
    mail: string
    employe?: employeUncheckedCreateNestedOneWithoutUtilisateurInput
    manager?: managerUncheckedCreateNestedOneWithoutUtilisateurInput
    rh?: rhUncheckedCreateNestedOneWithoutUtilisateurInput
  }

  export type utilisateurCreateOrConnectWithoutNotificationInput = {
    where: utilisateurWhereUniqueInput
    create: XOR<utilisateurCreateWithoutNotificationInput, utilisateurUncheckedCreateWithoutNotificationInput>
  }

  export type utilisateurUpsertWithoutNotificationInput = {
    update: XOR<utilisateurUpdateWithoutNotificationInput, utilisateurUncheckedUpdateWithoutNotificationInput>
    create: XOR<utilisateurCreateWithoutNotificationInput, utilisateurUncheckedCreateWithoutNotificationInput>
    where?: utilisateurWhereInput
  }

  export type utilisateurUpdateToOneWithWhereWithoutNotificationInput = {
    where?: utilisateurWhereInput
    data: XOR<utilisateurUpdateWithoutNotificationInput, utilisateurUncheckedUpdateWithoutNotificationInput>
  }

  export type utilisateurUpdateWithoutNotificationInput = {
    nom_utilisateur?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    mdp?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    employe?: employeUpdateOneWithoutUtilisateurNestedInput
    manager?: managerUpdateOneWithoutUtilisateurNestedInput
    rh?: rhUpdateOneWithoutUtilisateurNestedInput
  }

  export type utilisateurUncheckedUpdateWithoutNotificationInput = {
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    nom_utilisateur?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    mdp?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    employe?: employeUncheckedUpdateOneWithoutUtilisateurNestedInput
    manager?: managerUncheckedUpdateOneWithoutUtilisateurNestedInput
    rh?: rhUncheckedUpdateOneWithoutUtilisateurNestedInput
  }

  export type utilisateurCreateWithoutRhInput = {
    nom_utilisateur: string
    prenom: string
    mdp: string
    mail: string
    employe?: employeCreateNestedOneWithoutUtilisateurInput
    manager?: managerCreateNestedOneWithoutUtilisateurInput
    notification?: notificationCreateNestedManyWithoutUtilisateurInput
  }

  export type utilisateurUncheckedCreateWithoutRhInput = {
    id_utilisateur?: number
    nom_utilisateur: string
    prenom: string
    mdp: string
    mail: string
    employe?: employeUncheckedCreateNestedOneWithoutUtilisateurInput
    manager?: managerUncheckedCreateNestedOneWithoutUtilisateurInput
    notification?: notificationUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type utilisateurCreateOrConnectWithoutRhInput = {
    where: utilisateurWhereUniqueInput
    create: XOR<utilisateurCreateWithoutRhInput, utilisateurUncheckedCreateWithoutRhInput>
  }

  export type utilisateurUpsertWithoutRhInput = {
    update: XOR<utilisateurUpdateWithoutRhInput, utilisateurUncheckedUpdateWithoutRhInput>
    create: XOR<utilisateurCreateWithoutRhInput, utilisateurUncheckedCreateWithoutRhInput>
    where?: utilisateurWhereInput
  }

  export type utilisateurUpdateToOneWithWhereWithoutRhInput = {
    where?: utilisateurWhereInput
    data: XOR<utilisateurUpdateWithoutRhInput, utilisateurUncheckedUpdateWithoutRhInput>
  }

  export type utilisateurUpdateWithoutRhInput = {
    nom_utilisateur?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    mdp?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    employe?: employeUpdateOneWithoutUtilisateurNestedInput
    manager?: managerUpdateOneWithoutUtilisateurNestedInput
    notification?: notificationUpdateManyWithoutUtilisateurNestedInput
  }

  export type utilisateurUncheckedUpdateWithoutRhInput = {
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    nom_utilisateur?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    mdp?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    employe?: employeUncheckedUpdateOneWithoutUtilisateurNestedInput
    manager?: managerUncheckedUpdateOneWithoutUtilisateurNestedInput
    notification?: notificationUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type demandes_congeCreateWithoutTypes_congeInput = {
    motif?: string | null
    statut_demandes_conge?: string | null
    commentaire_manager?: string | null
    commentaire_rh?: string | null
    date_demande?: Date | string | null
    date_debut?: Date | string | null
    date_fin?: Date | string | null
    nombre_jours?: number | null
    employe: employeCreateNestedOneWithoutDemandes_congeInput
  }

  export type demandes_congeUncheckedCreateWithoutTypes_congeInput = {
    id_demande_conde?: number
    id_employe: number
    motif?: string | null
    statut_demandes_conge?: string | null
    commentaire_manager?: string | null
    commentaire_rh?: string | null
    date_demande?: Date | string | null
    date_debut?: Date | string | null
    date_fin?: Date | string | null
    nombre_jours?: number | null
  }

  export type demandes_congeCreateOrConnectWithoutTypes_congeInput = {
    where: demandes_congeWhereUniqueInput
    create: XOR<demandes_congeCreateWithoutTypes_congeInput, demandes_congeUncheckedCreateWithoutTypes_congeInput>
  }

  export type demandes_congeCreateManyTypes_congeInputEnvelope = {
    data: demandes_congeCreateManyTypes_congeInput | demandes_congeCreateManyTypes_congeInput[]
    skipDuplicates?: boolean
  }

  export type managerCreateWithoutTypes_congeInput = {
    nom_manager: string
    prenom_manager: string
    telephone_manager?: string | null
    adresse_manager?: string | null
    statut_manager?: string | null
    departement_departement_id_managerTomanager?: departementCreateNestedManyWithoutManager_departement_id_managerTomanagerInput
    departement_manager_id_departementTodepartement?: departementCreateNestedOneWithoutManager_manager_id_departementTodepartementInput
    utilisateur?: utilisateurCreateNestedOneWithoutManagerInput
  }

  export type managerUncheckedCreateWithoutTypes_congeInput = {
    id_manager?: number
    nom_manager: string
    prenom_manager: string
    telephone_manager?: string | null
    adresse_manager?: string | null
    statut_manager?: string | null
    id_departement?: number | null
    id_utilisateur?: number | null
    departement_departement_id_managerTomanager?: departementUncheckedCreateNestedManyWithoutManager_departement_id_managerTomanagerInput
  }

  export type managerCreateOrConnectWithoutTypes_congeInput = {
    where: managerWhereUniqueInput
    create: XOR<managerCreateWithoutTypes_congeInput, managerUncheckedCreateWithoutTypes_congeInput>
  }

  export type demandes_congeUpsertWithWhereUniqueWithoutTypes_congeInput = {
    where: demandes_congeWhereUniqueInput
    update: XOR<demandes_congeUpdateWithoutTypes_congeInput, demandes_congeUncheckedUpdateWithoutTypes_congeInput>
    create: XOR<demandes_congeCreateWithoutTypes_congeInput, demandes_congeUncheckedCreateWithoutTypes_congeInput>
  }

  export type demandes_congeUpdateWithWhereUniqueWithoutTypes_congeInput = {
    where: demandes_congeWhereUniqueInput
    data: XOR<demandes_congeUpdateWithoutTypes_congeInput, demandes_congeUncheckedUpdateWithoutTypes_congeInput>
  }

  export type demandes_congeUpdateManyWithWhereWithoutTypes_congeInput = {
    where: demandes_congeScalarWhereInput
    data: XOR<demandes_congeUpdateManyMutationInput, demandes_congeUncheckedUpdateManyWithoutTypes_congeInput>
  }

  export type managerUpsertWithoutTypes_congeInput = {
    update: XOR<managerUpdateWithoutTypes_congeInput, managerUncheckedUpdateWithoutTypes_congeInput>
    create: XOR<managerCreateWithoutTypes_congeInput, managerUncheckedCreateWithoutTypes_congeInput>
    where?: managerWhereInput
  }

  export type managerUpdateToOneWithWhereWithoutTypes_congeInput = {
    where?: managerWhereInput
    data: XOR<managerUpdateWithoutTypes_congeInput, managerUncheckedUpdateWithoutTypes_congeInput>
  }

  export type managerUpdateWithoutTypes_congeInput = {
    nom_manager?: StringFieldUpdateOperationsInput | string
    prenom_manager?: StringFieldUpdateOperationsInput | string
    telephone_manager?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_manager?: NullableStringFieldUpdateOperationsInput | string | null
    statut_manager?: NullableStringFieldUpdateOperationsInput | string | null
    departement_departement_id_managerTomanager?: departementUpdateManyWithoutManager_departement_id_managerTomanagerNestedInput
    departement_manager_id_departementTodepartement?: departementUpdateOneWithoutManager_manager_id_departementTodepartementNestedInput
    utilisateur?: utilisateurUpdateOneWithoutManagerNestedInput
  }

  export type managerUncheckedUpdateWithoutTypes_congeInput = {
    id_manager?: IntFieldUpdateOperationsInput | number
    nom_manager?: StringFieldUpdateOperationsInput | string
    prenom_manager?: StringFieldUpdateOperationsInput | string
    telephone_manager?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_manager?: NullableStringFieldUpdateOperationsInput | string | null
    statut_manager?: NullableStringFieldUpdateOperationsInput | string | null
    id_departement?: NullableIntFieldUpdateOperationsInput | number | null
    id_utilisateur?: NullableIntFieldUpdateOperationsInput | number | null
    departement_departement_id_managerTomanager?: departementUncheckedUpdateManyWithoutManager_departement_id_managerTomanagerNestedInput
  }

  export type employeCreateWithoutUtilisateurInput = {
    nom_employe: string
    prenom_employe: string
    telephone_employe?: string | null
    adresse_employe?: string | null
    statut_employe?: string | null
    demandes_conge?: demandes_congeCreateNestedManyWithoutEmployeInput
    departement?: departementCreateNestedOneWithoutEmployeInput
  }

  export type employeUncheckedCreateWithoutUtilisateurInput = {
    id_employe?: number
    nom_employe: string
    prenom_employe: string
    telephone_employe?: string | null
    adresse_employe?: string | null
    statut_employe?: string | null
    id_departement?: number | null
    demandes_conge?: demandes_congeUncheckedCreateNestedManyWithoutEmployeInput
  }

  export type employeCreateOrConnectWithoutUtilisateurInput = {
    where: employeWhereUniqueInput
    create: XOR<employeCreateWithoutUtilisateurInput, employeUncheckedCreateWithoutUtilisateurInput>
  }

  export type managerCreateWithoutUtilisateurInput = {
    nom_manager: string
    prenom_manager: string
    telephone_manager?: string | null
    adresse_manager?: string | null
    statut_manager?: string | null
    departement_departement_id_managerTomanager?: departementCreateNestedManyWithoutManager_departement_id_managerTomanagerInput
    departement_manager_id_departementTodepartement?: departementCreateNestedOneWithoutManager_manager_id_departementTodepartementInput
    types_conge?: types_congeCreateNestedManyWithoutManagerInput
  }

  export type managerUncheckedCreateWithoutUtilisateurInput = {
    id_manager?: number
    nom_manager: string
    prenom_manager: string
    telephone_manager?: string | null
    adresse_manager?: string | null
    statut_manager?: string | null
    id_departement?: number | null
    departement_departement_id_managerTomanager?: departementUncheckedCreateNestedManyWithoutManager_departement_id_managerTomanagerInput
    types_conge?: types_congeUncheckedCreateNestedManyWithoutManagerInput
  }

  export type managerCreateOrConnectWithoutUtilisateurInput = {
    where: managerWhereUniqueInput
    create: XOR<managerCreateWithoutUtilisateurInput, managerUncheckedCreateWithoutUtilisateurInput>
  }

  export type notificationCreateWithoutUtilisateurInput = {
    message: string
    statut_notification?: string | null
    date_envoie_notification?: Date | string | null
  }

  export type notificationUncheckedCreateWithoutUtilisateurInput = {
    id_notification?: number
    message: string
    statut_notification?: string | null
    date_envoie_notification?: Date | string | null
  }

  export type notificationCreateOrConnectWithoutUtilisateurInput = {
    where: notificationWhereUniqueInput
    create: XOR<notificationCreateWithoutUtilisateurInput, notificationUncheckedCreateWithoutUtilisateurInput>
  }

  export type notificationCreateManyUtilisateurInputEnvelope = {
    data: notificationCreateManyUtilisateurInput | notificationCreateManyUtilisateurInput[]
    skipDuplicates?: boolean
  }

  export type rhCreateWithoutUtilisateurInput = {
    nom_rh: string
    prenom_rh: string
    telephone_rh?: string | null
    adresse_rh?: string | null
    statut_rh?: string | null
  }

  export type rhUncheckedCreateWithoutUtilisateurInput = {
    id_rh?: number
    nom_rh: string
    prenom_rh: string
    telephone_rh?: string | null
    adresse_rh?: string | null
    statut_rh?: string | null
  }

  export type rhCreateOrConnectWithoutUtilisateurInput = {
    where: rhWhereUniqueInput
    create: XOR<rhCreateWithoutUtilisateurInput, rhUncheckedCreateWithoutUtilisateurInput>
  }

  export type employeUpsertWithoutUtilisateurInput = {
    update: XOR<employeUpdateWithoutUtilisateurInput, employeUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<employeCreateWithoutUtilisateurInput, employeUncheckedCreateWithoutUtilisateurInput>
    where?: employeWhereInput
  }

  export type employeUpdateToOneWithWhereWithoutUtilisateurInput = {
    where?: employeWhereInput
    data: XOR<employeUpdateWithoutUtilisateurInput, employeUncheckedUpdateWithoutUtilisateurInput>
  }

  export type employeUpdateWithoutUtilisateurInput = {
    nom_employe?: StringFieldUpdateOperationsInput | string
    prenom_employe?: StringFieldUpdateOperationsInput | string
    telephone_employe?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_employe?: NullableStringFieldUpdateOperationsInput | string | null
    statut_employe?: NullableStringFieldUpdateOperationsInput | string | null
    demandes_conge?: demandes_congeUpdateManyWithoutEmployeNestedInput
    departement?: departementUpdateOneWithoutEmployeNestedInput
  }

  export type employeUncheckedUpdateWithoutUtilisateurInput = {
    id_employe?: IntFieldUpdateOperationsInput | number
    nom_employe?: StringFieldUpdateOperationsInput | string
    prenom_employe?: StringFieldUpdateOperationsInput | string
    telephone_employe?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_employe?: NullableStringFieldUpdateOperationsInput | string | null
    statut_employe?: NullableStringFieldUpdateOperationsInput | string | null
    id_departement?: NullableIntFieldUpdateOperationsInput | number | null
    demandes_conge?: demandes_congeUncheckedUpdateManyWithoutEmployeNestedInput
  }

  export type managerUpsertWithoutUtilisateurInput = {
    update: XOR<managerUpdateWithoutUtilisateurInput, managerUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<managerCreateWithoutUtilisateurInput, managerUncheckedCreateWithoutUtilisateurInput>
    where?: managerWhereInput
  }

  export type managerUpdateToOneWithWhereWithoutUtilisateurInput = {
    where?: managerWhereInput
    data: XOR<managerUpdateWithoutUtilisateurInput, managerUncheckedUpdateWithoutUtilisateurInput>
  }

  export type managerUpdateWithoutUtilisateurInput = {
    nom_manager?: StringFieldUpdateOperationsInput | string
    prenom_manager?: StringFieldUpdateOperationsInput | string
    telephone_manager?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_manager?: NullableStringFieldUpdateOperationsInput | string | null
    statut_manager?: NullableStringFieldUpdateOperationsInput | string | null
    departement_departement_id_managerTomanager?: departementUpdateManyWithoutManager_departement_id_managerTomanagerNestedInput
    departement_manager_id_departementTodepartement?: departementUpdateOneWithoutManager_manager_id_departementTodepartementNestedInput
    types_conge?: types_congeUpdateManyWithoutManagerNestedInput
  }

  export type managerUncheckedUpdateWithoutUtilisateurInput = {
    id_manager?: IntFieldUpdateOperationsInput | number
    nom_manager?: StringFieldUpdateOperationsInput | string
    prenom_manager?: StringFieldUpdateOperationsInput | string
    telephone_manager?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_manager?: NullableStringFieldUpdateOperationsInput | string | null
    statut_manager?: NullableStringFieldUpdateOperationsInput | string | null
    id_departement?: NullableIntFieldUpdateOperationsInput | number | null
    departement_departement_id_managerTomanager?: departementUncheckedUpdateManyWithoutManager_departement_id_managerTomanagerNestedInput
    types_conge?: types_congeUncheckedUpdateManyWithoutManagerNestedInput
  }

  export type notificationUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: notificationWhereUniqueInput
    update: XOR<notificationUpdateWithoutUtilisateurInput, notificationUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<notificationCreateWithoutUtilisateurInput, notificationUncheckedCreateWithoutUtilisateurInput>
  }

  export type notificationUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: notificationWhereUniqueInput
    data: XOR<notificationUpdateWithoutUtilisateurInput, notificationUncheckedUpdateWithoutUtilisateurInput>
  }

  export type notificationUpdateManyWithWhereWithoutUtilisateurInput = {
    where: notificationScalarWhereInput
    data: XOR<notificationUpdateManyMutationInput, notificationUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type notificationScalarWhereInput = {
    AND?: notificationScalarWhereInput | notificationScalarWhereInput[]
    OR?: notificationScalarWhereInput[]
    NOT?: notificationScalarWhereInput | notificationScalarWhereInput[]
    id_notification?: IntFilter<"notification"> | number
    id_utilisateur?: IntFilter<"notification"> | number
    message?: StringFilter<"notification"> | string
    statut_notification?: StringNullableFilter<"notification"> | string | null
    date_envoie_notification?: DateTimeNullableFilter<"notification"> | Date | string | null
  }

  export type rhUpsertWithoutUtilisateurInput = {
    update: XOR<rhUpdateWithoutUtilisateurInput, rhUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<rhCreateWithoutUtilisateurInput, rhUncheckedCreateWithoutUtilisateurInput>
    where?: rhWhereInput
  }

  export type rhUpdateToOneWithWhereWithoutUtilisateurInput = {
    where?: rhWhereInput
    data: XOR<rhUpdateWithoutUtilisateurInput, rhUncheckedUpdateWithoutUtilisateurInput>
  }

  export type rhUpdateWithoutUtilisateurInput = {
    nom_rh?: StringFieldUpdateOperationsInput | string
    prenom_rh?: StringFieldUpdateOperationsInput | string
    telephone_rh?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_rh?: NullableStringFieldUpdateOperationsInput | string | null
    statut_rh?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type rhUncheckedUpdateWithoutUtilisateurInput = {
    id_rh?: IntFieldUpdateOperationsInput | number
    nom_rh?: StringFieldUpdateOperationsInput | string
    prenom_rh?: StringFieldUpdateOperationsInput | string
    telephone_rh?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_rh?: NullableStringFieldUpdateOperationsInput | string | null
    statut_rh?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type employeCreateManyDepartementInput = {
    id_employe?: number
    nom_employe: string
    prenom_employe: string
    telephone_employe?: string | null
    adresse_employe?: string | null
    statut_employe?: string | null
    id_utilisateur?: number | null
  }

  export type managerCreateManyDepartement_manager_id_departementTodepartementInput = {
    id_manager?: number
    nom_manager: string
    prenom_manager: string
    telephone_manager?: string | null
    adresse_manager?: string | null
    statut_manager?: string | null
    id_utilisateur?: number | null
  }

  export type employeUpdateWithoutDepartementInput = {
    nom_employe?: StringFieldUpdateOperationsInput | string
    prenom_employe?: StringFieldUpdateOperationsInput | string
    telephone_employe?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_employe?: NullableStringFieldUpdateOperationsInput | string | null
    statut_employe?: NullableStringFieldUpdateOperationsInput | string | null
    demandes_conge?: demandes_congeUpdateManyWithoutEmployeNestedInput
    utilisateur?: utilisateurUpdateOneWithoutEmployeNestedInput
  }

  export type employeUncheckedUpdateWithoutDepartementInput = {
    id_employe?: IntFieldUpdateOperationsInput | number
    nom_employe?: StringFieldUpdateOperationsInput | string
    prenom_employe?: StringFieldUpdateOperationsInput | string
    telephone_employe?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_employe?: NullableStringFieldUpdateOperationsInput | string | null
    statut_employe?: NullableStringFieldUpdateOperationsInput | string | null
    id_utilisateur?: NullableIntFieldUpdateOperationsInput | number | null
    demandes_conge?: demandes_congeUncheckedUpdateManyWithoutEmployeNestedInput
  }

  export type employeUncheckedUpdateManyWithoutDepartementInput = {
    id_employe?: IntFieldUpdateOperationsInput | number
    nom_employe?: StringFieldUpdateOperationsInput | string
    prenom_employe?: StringFieldUpdateOperationsInput | string
    telephone_employe?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_employe?: NullableStringFieldUpdateOperationsInput | string | null
    statut_employe?: NullableStringFieldUpdateOperationsInput | string | null
    id_utilisateur?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type managerUpdateWithoutDepartement_manager_id_departementTodepartementInput = {
    nom_manager?: StringFieldUpdateOperationsInput | string
    prenom_manager?: StringFieldUpdateOperationsInput | string
    telephone_manager?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_manager?: NullableStringFieldUpdateOperationsInput | string | null
    statut_manager?: NullableStringFieldUpdateOperationsInput | string | null
    departement_departement_id_managerTomanager?: departementUpdateManyWithoutManager_departement_id_managerTomanagerNestedInput
    utilisateur?: utilisateurUpdateOneWithoutManagerNestedInput
    types_conge?: types_congeUpdateManyWithoutManagerNestedInput
  }

  export type managerUncheckedUpdateWithoutDepartement_manager_id_departementTodepartementInput = {
    id_manager?: IntFieldUpdateOperationsInput | number
    nom_manager?: StringFieldUpdateOperationsInput | string
    prenom_manager?: StringFieldUpdateOperationsInput | string
    telephone_manager?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_manager?: NullableStringFieldUpdateOperationsInput | string | null
    statut_manager?: NullableStringFieldUpdateOperationsInput | string | null
    id_utilisateur?: NullableIntFieldUpdateOperationsInput | number | null
    departement_departement_id_managerTomanager?: departementUncheckedUpdateManyWithoutManager_departement_id_managerTomanagerNestedInput
    types_conge?: types_congeUncheckedUpdateManyWithoutManagerNestedInput
  }

  export type managerUncheckedUpdateManyWithoutDepartement_manager_id_departementTodepartementInput = {
    id_manager?: IntFieldUpdateOperationsInput | number
    nom_manager?: StringFieldUpdateOperationsInput | string
    prenom_manager?: StringFieldUpdateOperationsInput | string
    telephone_manager?: NullableStringFieldUpdateOperationsInput | string | null
    adresse_manager?: NullableStringFieldUpdateOperationsInput | string | null
    statut_manager?: NullableStringFieldUpdateOperationsInput | string | null
    id_utilisateur?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type demandes_congeCreateManyEmployeInput = {
    id_demande_conde?: number
    id_type_conge: number
    motif?: string | null
    statut_demandes_conge?: string | null
    commentaire_manager?: string | null
    commentaire_rh?: string | null
    date_demande?: Date | string | null
    date_debut?: Date | string | null
    date_fin?: Date | string | null
    nombre_jours?: number | null
  }

  export type demandes_congeUpdateWithoutEmployeInput = {
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    statut_demandes_conge?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_manager?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_rh?: NullableStringFieldUpdateOperationsInput | string | null
    date_demande?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_debut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre_jours?: NullableIntFieldUpdateOperationsInput | number | null
    types_conge?: types_congeUpdateOneRequiredWithoutDemandes_congeNestedInput
  }

  export type demandes_congeUncheckedUpdateWithoutEmployeInput = {
    id_demande_conde?: IntFieldUpdateOperationsInput | number
    id_type_conge?: IntFieldUpdateOperationsInput | number
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    statut_demandes_conge?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_manager?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_rh?: NullableStringFieldUpdateOperationsInput | string | null
    date_demande?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_debut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre_jours?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type demandes_congeUncheckedUpdateManyWithoutEmployeInput = {
    id_demande_conde?: IntFieldUpdateOperationsInput | number
    id_type_conge?: IntFieldUpdateOperationsInput | number
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    statut_demandes_conge?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_manager?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_rh?: NullableStringFieldUpdateOperationsInput | string | null
    date_demande?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_debut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre_jours?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type departementCreateManyManager_departement_id_managerTomanagerInput = {
    id_departement?: number
    nom_departement: string
  }

  export type types_congeCreateManyManagerInput = {
    id_conge?: number
    nom_types_conge: string
    statut_types_conge?: string | null
    duree?: number | null
  }

  export type departementUpdateWithoutManager_departement_id_managerTomanagerInput = {
    nom_departement?: StringFieldUpdateOperationsInput | string
    employe?: employeUpdateManyWithoutDepartementNestedInput
    manager_manager_id_departementTodepartement?: managerUpdateManyWithoutDepartement_manager_id_departementTodepartementNestedInput
  }

  export type departementUncheckedUpdateWithoutManager_departement_id_managerTomanagerInput = {
    id_departement?: IntFieldUpdateOperationsInput | number
    nom_departement?: StringFieldUpdateOperationsInput | string
    employe?: employeUncheckedUpdateManyWithoutDepartementNestedInput
    manager_manager_id_departementTodepartement?: managerUncheckedUpdateManyWithoutDepartement_manager_id_departementTodepartementNestedInput
  }

  export type departementUncheckedUpdateManyWithoutManager_departement_id_managerTomanagerInput = {
    id_departement?: IntFieldUpdateOperationsInput | number
    nom_departement?: StringFieldUpdateOperationsInput | string
  }

  export type types_congeUpdateWithoutManagerInput = {
    nom_types_conge?: StringFieldUpdateOperationsInput | string
    statut_types_conge?: NullableStringFieldUpdateOperationsInput | string | null
    duree?: NullableIntFieldUpdateOperationsInput | number | null
    demandes_conge?: demandes_congeUpdateManyWithoutTypes_congeNestedInput
  }

  export type types_congeUncheckedUpdateWithoutManagerInput = {
    id_conge?: IntFieldUpdateOperationsInput | number
    nom_types_conge?: StringFieldUpdateOperationsInput | string
    statut_types_conge?: NullableStringFieldUpdateOperationsInput | string | null
    duree?: NullableIntFieldUpdateOperationsInput | number | null
    demandes_conge?: demandes_congeUncheckedUpdateManyWithoutTypes_congeNestedInput
  }

  export type types_congeUncheckedUpdateManyWithoutManagerInput = {
    id_conge?: IntFieldUpdateOperationsInput | number
    nom_types_conge?: StringFieldUpdateOperationsInput | string
    statut_types_conge?: NullableStringFieldUpdateOperationsInput | string | null
    duree?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type demandes_congeCreateManyTypes_congeInput = {
    id_demande_conde?: number
    id_employe: number
    motif?: string | null
    statut_demandes_conge?: string | null
    commentaire_manager?: string | null
    commentaire_rh?: string | null
    date_demande?: Date | string | null
    date_debut?: Date | string | null
    date_fin?: Date | string | null
    nombre_jours?: number | null
  }

  export type demandes_congeUpdateWithoutTypes_congeInput = {
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    statut_demandes_conge?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_manager?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_rh?: NullableStringFieldUpdateOperationsInput | string | null
    date_demande?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_debut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre_jours?: NullableIntFieldUpdateOperationsInput | number | null
    employe?: employeUpdateOneRequiredWithoutDemandes_congeNestedInput
  }

  export type demandes_congeUncheckedUpdateWithoutTypes_congeInput = {
    id_demande_conde?: IntFieldUpdateOperationsInput | number
    id_employe?: IntFieldUpdateOperationsInput | number
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    statut_demandes_conge?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_manager?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_rh?: NullableStringFieldUpdateOperationsInput | string | null
    date_demande?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_debut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre_jours?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type demandes_congeUncheckedUpdateManyWithoutTypes_congeInput = {
    id_demande_conde?: IntFieldUpdateOperationsInput | number
    id_employe?: IntFieldUpdateOperationsInput | number
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    statut_demandes_conge?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_manager?: NullableStringFieldUpdateOperationsInput | string | null
    commentaire_rh?: NullableStringFieldUpdateOperationsInput | string | null
    date_demande?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_debut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre_jours?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type notificationCreateManyUtilisateurInput = {
    id_notification?: number
    message: string
    statut_notification?: string | null
    date_envoie_notification?: Date | string | null
  }

  export type notificationUpdateWithoutUtilisateurInput = {
    message?: StringFieldUpdateOperationsInput | string
    statut_notification?: NullableStringFieldUpdateOperationsInput | string | null
    date_envoie_notification?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificationUncheckedUpdateWithoutUtilisateurInput = {
    id_notification?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    statut_notification?: NullableStringFieldUpdateOperationsInput | string | null
    date_envoie_notification?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificationUncheckedUpdateManyWithoutUtilisateurInput = {
    id_notification?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    statut_notification?: NullableStringFieldUpdateOperationsInput | string | null
    date_envoie_notification?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}