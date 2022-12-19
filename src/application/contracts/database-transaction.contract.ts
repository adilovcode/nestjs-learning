export abstract class IDatabaseTransaction {
    abstract start(): void;

    abstract rollback(): void;

    abstract commit(): void;
}