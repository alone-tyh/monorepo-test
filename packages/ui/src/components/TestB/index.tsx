import React from 'react';

export const TestB: React.FC<{ message?: string, testProps?: string, b?:string }> = () => {

    return (
        <div style={{ width: 200, height: 100, backgroundColor: 'red' }}>
            这是测试按钮BBB
        </div>
    )
}