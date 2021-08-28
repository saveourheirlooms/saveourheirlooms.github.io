import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonNft = () => {
    return (
        <div className="col">
            <div
                className="card"
                style={{ width: "15rem", marginBottom: "25px" }}
            >
                <SkeletonElement type="avatar" />
                <div className="card-body">
                    <SkeletonElement type="title" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <p className="card-text" />
                    <SkeletonElement type="button" />
                    <SkeletonElement type="price" />
                </div>
            </div>
            <Shimmer />
        </div>
    );
};

export default SkeletonNft;
